import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import getUserDetailFromToken from '../utils/getUserDetailFromToken.js'
import UserModel from '../model/user.model.js';
import ConversationModel from '../model/conversation.model.js';
import MessageModel from '../model/message.model.js';
import getConversation from '../utils/getConversation.js';
const app = express();

// socket connection

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUser = new Set()

io.on('connection',async(socket) => {
  console.log("connect user", socket.id);

  const token = socket.handshake.auth.token;

  // current user details

  const user = await getUserDetailFromToken(token)

  
  //create a room

  socket.join(user?._id?.toString())
  onlineUser.add(user?._id?.toString())

  io.emit('onlineUser', Array.from(onlineUser))

  socket.on("message-page",async (userId) => {
    console.log('userId',userId);
    const userDetails = await UserModel.findById(userId).select("-password")
        
        const payload = {
            _id : userDetails?._id,
            name : userDetails?.name,
            email : userDetails?.email,
            profile_pic : userDetails?.profile_pic,
            online : onlineUser.has(userId)
        }
        socket.emit('message-user',payload)

         //get previous message
         const getConversationMessage = await ConversationModel.findOne({
          "$or" : [
              { sender : user?._id, receiver : userId },
              { sender : userId, receiver :  user?._id}
          ]
      }).populate('message').sort({ updatedAt : -1 })

      socket.emit('message',getConversationMessage?.message || [])
  })

      //new message             
      socket.on('new message',async(data)=>{

        //check conversation is available both user
        
        let conversation = await ConversationModel.findOne({
            "$or" : [
                { sender : data?.sender, receiver : data?.receiver },
                { sender : data?.receiver, receiver :  data?.sender}
            ]
        })

        //if conversation is not available
        if(!conversation){
            const createConversation = await ConversationModel({
                sender : data?.sender,
                receiver : data?.receiver
            })
             conversation = await createConversation.save()
        }
        
        const message = new MessageModel({
          text : data.text,
          imageUrl : data.imageUrl,
          videoUrl : data.videoUrl,
          msgByUserId :  data?.msgByUserId,
        })
        const saveMessage = await message.save()

        const updateConversation = await ConversationModel.updateOne({ _id : conversation?._id },{
            "$push" : { message : saveMessage?._id }
        })

        const getConversationMessage = await ConversationModel.findOne({
            "$or" : [
                { sender : data?.sender, receiver : data?.receiver },
                { sender : data?.receiver, receiver :  data?.sender}
            ]
        }).populate('message').sort({ updatedAt : -1 })

        console.log("getConversionMessage", getConversationMessage.message);
        
        //send message to sender and receiver
        console.log("sender", data?.sender);
        console.log("receiver", data?.receiver);
        
        io.to(data?.sender).emit('message',getConversationMessage?.message || [])
        io.to(data?.receiver).emit('message',getConversationMessage?.message || [])

        // send conversation
        const conversationSender = await getConversation(data?.sender)
        const conversationReceiver = await getConversation(data?.receiver)

        io.to(data?.sender).emit('conversation',conversationSender)
        io.to(data?.receiver).emit('conversation',conversationReceiver)
    })
    
    //sidebar
    socket.on('sidebar',async(currentUserId)=>{
      console.log("current user",currentUserId)

      const conversation = await getConversation(currentUserId)

      socket.emit('conversation',conversation)
      
  })

  socket.on('seen',async(msgByUserId)=>{
      
      let conversation = await ConversationModel.findOne({
          "$or" : [
              { sender : user?._id, receiver : msgByUserId },
              { sender : msgByUserId, receiver :  user?._id}
          ]
      })

      const conversationMessageId = conversation?.message || []

      const updateMessages  = await MessageModel.updateMany(
          { _id : { "$in" : conversationMessageId }, msgByUserId : msgByUserId },
          { "$set" : { seen : true }}
      )

      //send conversation
      const conversationSender = await getConversation(user?._id?.toString())
      const conversationReceiver = await getConversation(msgByUserId)

      io.to(user?._id?.toString()).emit('conversation',conversationSender)
      io.to(msgByUserId).emit('conversation',conversationReceiver)
  })

  socket.on('disconnect',() =>{
    onlineUser.delete(user?._id?.toString())
    console.log('disconnect user',socket.id);
  })
  
})

export {app, server}