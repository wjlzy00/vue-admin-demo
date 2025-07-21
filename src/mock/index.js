import Mock from "mockjs";
import GoodsList from "../views/GoodsList.vue";



Mock.mock("/api/goods", "post", (options) => {
  const requestData = JSON.parse(options.body);
  console.log('前端数据：',requestData);

  const newGoods = {
    name: requestData.name,
    url: requestData.url,
    price: requestData.price,
    inventory: requestData.inventory,
    tags: requestData.tags,
    state: requestData.state
  }

});
