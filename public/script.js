const socket = io('/')

const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001'
})
var myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

socket.on('user-connected', userId => {
    console.log('User connected: ' + userId)
})

function connectToNewUser(userId, stream){
    const call = myPeer.call(userId, stream)
    const video = docuemnt.createElement('video')
    call.on('stream', uservideoStream =>{
        addVideoStream(video, uservideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
        video.play()
    }
    videoGrid.append(video)
}