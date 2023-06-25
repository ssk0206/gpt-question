import React from "react";
import { Message } from "../types/custom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

type InputFormProps = {
  onSubmit: (message: Message) => Promise<void>;
};

const InputForm = ({ onSubmit }: InputFormProps) => {
  // input要素への参照を作成
  const [tags, setTags] = React.useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputValue = tags.join("、");
    const submitValue = `${inputValue}に関する質問をいくつか考えてください。`;

    if (inputValue) {
      onSubmit({
        role: "user",
        content: submitValue,
      });
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    setTags([]);
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <ReactTagInput
        placeholder="キーワードをいくつか入力してください"
        tags={tags}
        onChange={(newTags) => setTags(newTags)}
      />
      <br />
      <button
        type="reset"
        className="ml-4 px-4 py-2 bg-white border border-gray-500 text-gray-500 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      >
        キーワードをリセット
      </button>
      <button
        type="submit"
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      >
        質問を作成
      </button>
    </form>
  );
};

export default InputForm;
