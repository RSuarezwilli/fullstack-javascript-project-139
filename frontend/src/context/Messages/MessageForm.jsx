import React, { useState } from "react";
import socket from "../../socket";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// 🔥 FILTRO
import {
  hasProfanity,
  cleanProfanity
} from "../../utils/profanityFilters";

const MessageForm = ({ channelId }) => {
  const [text, setText] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    // 🔥 PUNTO 2 VA AQUÍ
    if (hasProfanity(text)) {
      toast.error(t("errors.profanity"));
      return;
    }

    socket.emit("newMessage", {
      body: cleanProfanity(text),
      channelId,
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <input
        className="form-control"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("messages.placeholder")}
      />
      <button className="btn btn-primary mt-2" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default MessageForm;
