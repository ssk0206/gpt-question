import { Avatar, Flex, border } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Message } from "../types/custom";

const Chat = ({ content, role }: Message) => {
  const [chatMessage, setChatMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);
  const [clicked, setClicked] = useState(100);
  const contentEl = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    if (clicked === index) {
      return setClicked(100);
    }

    setClicked(index);
  };

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeoutId = setTimeout(() => {
        setChatMessage((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 2);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [content, currentIndex]);

  return (
    <motion.div
      style={{
        alignSelf: role === "assistant" ? "flex-start" : "flex-end",
        width: "auto",
      }}
      initial={{
        opacity: 0,
        translateY: "100%",
      }}
      animate={{ opacity: 1, translateY: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, translateY: 0 }}
    >
      <Flex
        gap="5px"
        w="full"
        flexDir={role === "assistant" ? "row" : "row-reverse"}
        mt="10"
      >
        <Avatar
          name={role === "user" ? "Me" : "Loris"}
          w="40px"
          h="40px"
          src={role === "assistant" ? "/kensaku.png" : "/user.png"}
        />
        <Flex
          borderWidth={1}
          borderColor="blue.400"
          bg="main-bg"
          p="0.5rem 1rem"
          w="auto"
          mt="16"
          rounded={
            role === "assistant" ? "0 20px 20px 20px" : "20px 0 20px 20px"
          }
          fontSize={{ base: "8px", md: "18px" }}
          flexDir="column"
        >
          {role === "assistant" && (
            <Flex
              alignSelf="flex-end"
              fontStyle="italic"
              opacity={0.4}
              fontSize="8px"
              as="small"
              fontWeight={500}
            >
              AIアシスタント
            </Flex>
          )}
          {role === "user" && (
            <Flex
              alignSelf="flex-start"
              fontStyle="italic"
              opacity={0.4}
              fontSize="8px"
              as="small"
              fontWeight={500}
            >
              あなた
            </Flex>
          )}
          {(role === "assistant" &&
            chatMessage.split("\n").map((text, index) => (
              <div
                key={index}
                className="rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                style={
                  clicked === index
                    ? { border: "solid 2px #999999", margin: "0.5rem" }
                    : {
                        border: "solid 1px #cccccc",
                        margin: "0.5rem",
                        color: "gray",
                      }
                }
              >
                <button
                  type="button"
                  onClick={() => handleClick(index)}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                  }}
                >
                  {text}
                </button>
                <div
                  ref={contentEl}
                  style={
                    clicked === index
                      ? {
                          height: contentEl?.current?.scrollHeight,
                        }
                      : { height: "0px", overflow: "hidden" }
                  }
                >
                  {
                    <>
                      <button
                        className="ml-4 px-4 py-2 text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:border-gray-300"
                        style={{ marginBottom: "15px" }}
                      >
                        類似質問を作成する
                      </button>
                      <button
                        className="ml-4 px-4 py-2 text-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring focus:border-gray-300"
                        style={{ marginBottom: "15px" }}
                      >
                        テンプレートに使用する
                      </button>
                    </>
                  }
                </div>
              </div>
            ))) ||
            ""}
          {(role !== "assistant" && content) || ""}
        </Flex>
      </Flex>
    </motion.div>
  );
};

export default Chat;
