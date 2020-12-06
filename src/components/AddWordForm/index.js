import React, { useState, useContext } from "react";

import { getTranslatedWord } from "../../services/dictionary";

import BlockTitle from "../BlockTitle";

import { SwapOutlined, FileAddOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";

import FirebaseContext from "../../context/firebaseContext";

const AddWordForm = () => {
  const firebase = useContext(FirebaseContext);

  const [cardData, setCardData] = useState({
    wordRus: "",
    wordEng: "",
  });
  const [workProcess, setWorkProcess] = useState({
    isTranslating: false,
    isAddingWord: false,
  });

  const translateHandler = async () => {
    setWorkProcess((store) => ({ ...store, isTranslating: true }));
    const translatedWord = await getTranslatedWord(cardData.wordEng);
    setWorkProcess((store) => ({ ...store, isTranslating: false }));
    setCardData((store) => ({ ...store, wordRus: translatedWord}));
  };

  const inputHandler = (event) => {
    const { dataset, value } = event.target;
    setCardData((store) => ({
      ...store,
      [dataset.lang]: value,
    }));
  };

  const addWordHandler = () => {
    const { getUserCardsRef } = firebase;
    setWorkProcess((store) => ({ ...store, isAddingWord: true }));
    getUserCardsRef()
      .push()
      .set({
        rus: cardData.wordRus,
        eng: cardData.wordEng,
        isRemembered: false,
      })
      .then(() => {
        setCardData((store) => ({
          ...store,
          wordRus: "",
          wordEng: "",
        }));
        setWorkProcess((store) => ({ ...store, isAddingWord: false }));
      });
  };

  return (
    <>
      <BlockTitle color="white">
        Кликайте по карточкам и узнавайте новые слова!
      </BlockTitle>
      <Form layout="horizontal">
        <Input.Group compact>
          <Input
            placeholder="Слово на английском"
            data-lang="wordEng"
            value={cardData.wordEng}
            onChange={inputHandler}
            prefix="ENG"
            style={{ width: "32.5%" }}
          />
          <Button
            type="primary"
            onClick={translateHandler}
            icon={<SwapOutlined />}
            loading={workProcess.isTranslating}
            style={{ width: "5%" }}
          />
          <Input
            placeholder="Слово на русском"
            data-lang="wordRus"
            value={cardData.wordRus}
            onChange={inputHandler}
            prefix="РУС"
            style={{ width: "30%" }}
          />
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={addWordHandler}
            style={{ width: "32.5%" }}
            loading={workProcess.isAddingWord}
          >
            Добавить слово
          </Button>
        </Input.Group>
      </Form>
    </>
  );
};

export default AddWordForm;