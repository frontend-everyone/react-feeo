const mockjs = require("mockjs");
const { successCallback } = require("./utils");

const avatars = [
  "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
  "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
  "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design Pro
  "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
  "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
  "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
  "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" // Webpack
];

// const avatars2 = [
//   "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png",
//   "https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png"
// ];

// const covers = [
//   "https://img2.woyaogexing.com/2018/05/29/f891905a0ee0567c!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/5a04273e62fecad5!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/e528103b9995c2bf!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/86260a6105b48c5e!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/5bcbcf46fc758bf4!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/aec08735cb78e6c9!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/cebb553ac80f0bcd!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/3d3af2055dcc42f2!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/a8ab7510c0ee8ea6!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/008bd8a142885912!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/e1ab4e9d028820df!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/14e4173eb4f6eabc!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/1e1d91ddaa0a69b7!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/2b5bdd10bb986cb8!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/b12464b9da3bb281!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/00d0e8d6693d36c2!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/be35750604f1c2a5!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/c1a999c726f732fd!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/eb17da9e1d47eaba!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/4de9e9e76deff46e!200x200.jpg",
//   "https://img2.woyaogexing.com/2018/05/29/270296fa5cccfbc1!200x200.jpg"
// ];

// const { Random } = mockjs;
module.exports = {
  "POST /mock/api/list": successCallback(
    mockjs.mock({
      "list|10": [
        {
          "id|+1": 1,
          title: "@title(10,50)",
          desc: "@title(50,200)",
          "covers|1": avatars,
          "look|1-100000": 150,
          "forward|1-100000": 150,
          "state|0-2": 1,
          date: '@date("MM-dd HH:mm")'
        }
      ]
    })
  )
};
