import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Title,
  ChatScreen,
  SendButton,
  MessageList,
  Message,
  InputContainer,
  Input,
  ScrollButton,
  ScrollIcon,
  ScrollToBottomButton,
} from "./styles";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Confetti from "react-confetti";

function App() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      // Add user's input to messages
      setMessages([...messages, { text: inputText, isBot: false }]);
      setInputText("");

      try {
        // Make a POST request to the Python backend
        const response = await axios.post("http://localhost:3001/api/ask", {
          question: inputText,
        });

        // Process and trim bot's response before adding to messages
        const botReply = response.data.reply;

        // Find the index where "Answer:" starts
        const answerIndex = botReply.indexOf("Answer:");

        // Trim the response after "Answer:" dynamically
        const trimmedBotReply =
          answerIndex !== -1 ? botReply.substring(answerIndex + 7) : botReply;
        setMessages([
          ...messages,
          { text: inputText, isBot: false },
          { text: trimmedBotReply, isBot: true },
        ]);
      } catch (error) {
        console.error(error);
      }

      scrollToBottom();
      inputRef.current.focus();
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (
      messageListRef.current.scrollTop <
      messageListRef.current.scrollHeight - messageListRef.current.clientHeight
    ) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    messageListRef.current.addEventListener("scroll", handleScroll);
    return () => {
      messageListRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      {showConfetti && <Confetti />}
      <Title>Welcome to the ChatBot!</Title>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ChatScreen>
          <MessageList ref={messageListRef}>
            {messages.map((message, index) => (
              <Message key={index} isBot={message.isBot}>
                {message.text}
              </Message>
            ))}
          </MessageList>
          <InputContainer>
            <Input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleInputKeyPress}
              ref={inputRef}
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </InputContainer>
          <ScrollToBottomButton>
            <ScrollButton show={showScrollButton} onClick={scrollToBottom}>
              <ScrollIcon icon={faArrowDown} />
            </ScrollButton>
          </ScrollToBottomButton>
        </ChatScreen>
      </div>
    </Container>
  );
}

export default App;
