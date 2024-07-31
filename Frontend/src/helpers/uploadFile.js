import axios from 'axios'

const url = `https://api.cloudinary.com/v1_1/dqzy3dfgf/auto/upload`

export const uploadFile = async(file) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset',"chat-app-file")
        
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        
        return response.data.secure_url
        
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message)
        throw error
    }
}