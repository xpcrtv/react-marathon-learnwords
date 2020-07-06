import React from "react";
import { Link } from "react-router-dom";

import BgImageBlock from "../../components/BgImageBlock";
import BlockTitle from "../../components/BlockTitle";

import { RollbackOutlined } from "@ant-design/icons";
import { Button } from "antd";

import notFoundBg from "../../assets/img/login.jpg";

const NotFoundPage = () => {
  return (
    <>
      <BgImageBlock imgSrc={notFoundBg}>
        <BlockTitle color="white">
          Ууууупс, кажется вы ищите что-то не то{" "}
          <span role="img" aria-label="thinking man">
            🙄
          </span>
        </BlockTitle>
        <Link to="/">
          <Button type="primary" icon={<RollbackOutlined />}>
            Вернуться на главную
          </Button>
        </Link>
      </BgImageBlock>
    </>
  );
};

export default NotFoundPage;
