import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import "../stylesheets/livechat.css";
import ChatUser from "../components/chatUser";
import group from "../assets/group.png";
import user from "../assets/user.png";
import send from "../assets/send.png";
import "../stylesheets/homePageBackground.scss"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function LiveChat() {
    const [currentChat, setCurrentChat] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [name, setName] = useState(''); 
    const chatBody = document.querySelector('.chat--body');
    const closeButton = useRef(null);
    const [userDictonairy, setUserDictonairy] = useState([{username: "", userid: "", chatid: ""}]);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    const chatRef = useRef(currentChat)
    const messagesRef = useRef(messages);

    useEffect(() => {
        messagesRef.current = messages;
        chatRef.current= currentChat;
    }, [messages, currentChat]);

       function scrollToBottom() {
          chatBody.scrollTop = chatBody.scrollHeight; 
       }

      
       async function close() {
            socket.emit('user-disconnected', name);
            
            await axios.put(`http://localhost:3000/api/chat/close/${chatRef.current}`, {withCredentials: true})
            .then(()=> {
                if (localStorage.getItem('userType')=="User"){
                  navigate('/fakelogin')
                }
                console.log("chat closed")})
            .catch((e)=>console.log(e));

            setName('');
            await getChats();
        }


        async function getChats(){
            await axios.get("http://localhost:3000/api/chat/viewchat", {withCredentials: true})
                .then((res)=>{
                    setUserDictonairy([]);
                    res.data.chat.forEach(chat=>{ 
                        setUserDictonairy(prevState=>[...prevState, {chatid: chat._id, userid: chat.userid, username:chat.userdata.UserName}]);
                    })  
                })
                .catch((e)=>console.log(e));
        }

        async function currentChatDetails(){
            await axios.get(`http://localhost:3000/api/chat/currentchat`, {withCredentials: true})
            .then((res)=>{setName(res.data.chat.userdata.UserName)
            setCurrentChat(res.data.chat._id)
            chatRef.current= res.data.chat._id;
            setMessage([]);
            // res.data.chat.messages.forEach(msg=>{
            //    if (msg.senderID==localStorage.getItem('userId')){
            //        setMessages(messages => [...messages, `You: ${msg.content}`]);
            //    }
            //    else{
            //        setMessages(messages => [...messages, msg.content]);
            //    }
            // })
        })
            .catch((e)=>console.log(e));
        }

        async function updateChat(){
            console.log(currentChat);
            await axios.get(`http://localhost:3000/api/chat/view/${chatRef.current}`, {withCredentials:true})
            .then((res)=>{

                setMessage([]);
                //  res.data.chat.messages.forEach(msg=>{
                //     if (msg.senderID==localStorage.getItem('userId')){
                //         setMessages(messages => [...messages, `You: ${msg.content}`]);
                //     }
                //     else{
                //         setMessages(messages => [...messages, msg.content]);
                //     }
                //  })
               const chatMessages = res.data.chat.messages.map(msg => 
                    msg.senderID==localStorage.getItem('userId')? `You: ${msg.content}`: msg.content)
                setMessages(chatMessages);
                messagesRef.current=chatMessages;
            })
            .catch(e=>console.log(e));
        }   

    useEffect(() => {
    
        currentChatDetails();
        getChats();
       

        const newSocket = io('http://localhost:4000/api/chat');

        setSocket(newSocket);

        let myData = {userType: localStorage.getItem('userType'), _id: localStorage.getItem('userId')};

        newSocket.emit('new-user',myData);


        newSocket.on('chat-message', async ()=>{
           await updateChat();  
        });

        newSocket.on('user-disconnected', async () => {
            // setMessages(messages => [...messages, `disconnected`]);
            await close(); 
        });

        async function handleBeforeUnload () {
            await close();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            newSocket.off('chat-message');
            newSocket.off('user-connected');
            newSocket.off('user-disconnected');
            newSocket.close();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    async function Send(e){
        e.preventDefault();
        if (!message) return;
  
        await axios.put("http://localhost:3000/api/chat/sendmessage", {id:currentChat, message: message}, {withCredentials: true})
        .then(()=> console.log("message sent"))
        .catch((e)=>console.log(e));

        await updateChat();

        setMessage('');
        e.target.reset(); 

        socket.emit('send-chat-message');
    };
    return ( 
        <div className="chat-main-div">

{ localStorage.getItem('userType')=="Agent" &&
          <div className="users--div">
            <h4 className="users--h4"> <img src={group} className="group--img"/>Users</h4>
            <div className="user--div--body">

              { (userDictonairy.length===1 && userDictonairy[0].chatid=="" && userDictonairy[0].userid=="" && userDictonairy[0].username=="")? null     
              :userDictonairy.map(user=> <ChatUser key={user.userid} UserName={user.username} setName={ async ()=>{
                setName(user.username); 
                setMessages([]);
                setCurrentChat(userDictonairy.find(userDic=> userDic.username==user.username).chatid);  
                chatRef.current=userDictonairy.find(userDic=> userDic.username==user.username).chatid;
                await updateChat();
                  }}/> )}

            </div>
          </div>
}
          <div className="chat--div">
         { name&&  <header className="chat--header">
                <span className='span--header'>
                <img src={user} className="user--img--2"/>
               {name}
               </span>
               <button ref={closeButton} className="close--chat" onClick={close}>Close</button>
            </header>
         } 


            <div className="chat--body">

                    {messagesRef.current.map((msg, index) => (
                        <>
                            <div className={msg.includes('You:') ? 'chat--message--mine' : 'chat--message'} key={index} ref={scrollToBottom}>
                                {msg}
                            </div>
                            <br/>
                        </>
                    )) } 

            </div>

            <form className="chat--form" onSubmit={Send}>
                <input
                    type="text"
                    className="chat--input"
                    placeholder="type your message here..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setMessage(e.target.value);
                        }
                    }}
                />
                <button
                    className="chat--send"
                    type="submit"
                    onClick={() => setMessage(document.querySelector(".chat--input").value)}
                >
                    <img src={send} className="send--img" />
                </button>
            </form>

          </div>

        </div>

    );
}

