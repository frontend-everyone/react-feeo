/**
 * @author: kirk
 * @date: 2019-02-27 10:43:40
 */
import React, { useState } from "react";
import { Spin } from "antd";

const LoadingPage = () => {
  const [loading, setLoading] = useState(false);
  const open = () => setLoading(true);
  const close = () => setLoading(false);
  if (!window.Loading) {
    window.Loading = {
      open,
      close
    };
  }

  return (
    loading && (
      <div className="loadingPage">
        <div className="cont">
          <Spin spinning={loading} size="large" />
        </div>
      </div>
    )
  );
};
export default LoadingPage;
