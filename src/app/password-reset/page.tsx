import { auth } from "@/app/lib/firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionCodeSettings = {
      // パスワード再設定後のリダイレクト URL
      url: "http://localhost:3000/",
    };
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center font-noto-sans">
          パスワードリセット
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 font-noto-sans"
            >
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 font-noto-sans disabled:opacity-50 disabled:cursor-not-allowed"
          >
            リセットリンクを送信
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
