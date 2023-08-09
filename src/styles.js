import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    padding: 0;
  }
`;

export const ChatScreen = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
`;

export const MessageList = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  position: relative;
`;

export const Message = styled.div`
  background-color: ${props => (props.isBot ? '#e1ecf9' : '#f0f0f0')};
  border-radius: ${props => (props.isBot ? '10px 10px 0 10px' : '0 10px 10px 10px')};
  padding: 10px;
  margin: 8px 0;
  max-width: 80%;
  align-self: ${props => (props.isBot ? 'flex-start' : 'flex-end')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 12px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 10px 16px;
  font-size: 14px;
  outline: none;
`;

export const Title = styled.h1`
  
`;

export const SendButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 20px;
  color: white;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
`;

export const ScrollButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  display: ${props => (props.show ? 'block' : 'none')};
`;

export const ScrollIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
`;

export const ScrollToBottomButton = styled.div`
  position: absolute;
  bottom: 70px;
  right: 20px;
`;