import { createServer, Model } from "miragejs";
import SportsWearItems from "../All_Items_iin_app/sportsitems";
import ShoesItems from "../All_Items_iin_app/shoesitems";
import GymEssentials from "../All_Items_iin_app/gymessentials";
import Supplements from "../All_Items_iin_app/supplements";
import FoodAndDrinks from "../All_Items_iin_app/foodanddrinks";

export const makeServer = function () {
  return createServer({
    models: {
      sportswear: Model,
      Shoe: Model,
      gymessential: Model,
      supplement: Model,
      foodanddrink: Model,
      cartitem: Model
    },

    seeds(server) {
      SportsWearItems.forEach((item) => {
        server.create("sportswear", {
          text: item.text,
          imgsrc: item.imgsrc,
          unique: item.unique,
          markedprice: item.markedprice,
          discount: item.discount
        });
      });
      ShoesItems.forEach((item) => {
        server.create("shoe", {
          text: item.text,
          imgsrc: item.imgsrc,
          unique: item.unique,
          markedprice: item.markedprice,
          discount: item.discount
        });
      });
      GymEssentials.forEach((item) => {
        server.create("gymessential", {
          text: item.text,
          imgsrc: item.imgsrc,
          unique: item.unique,
          markedprice: item.markedprice,
          discount: item.discount
        });
      });
      Supplements.forEach((item) => {
        server.create("supplement", {
          text: item.text,
          imgsrc: item.imgsrc,
          unique: item.unique,
          markedprice: item.markedprice,
          discount: item.discount
        });
      });
      FoodAndDrinks.forEach((item) => {
        server.create("foodanddrink", {
          text: item.text,
          imgsrc: item.imgsrc,
          unique: item.unique,
          markedprice: item.markedprice,
          discount: item.discount
        });
      });
    },

    routes() {
      this.get("/api/sportswears", (schema) => {
        return schema.sportswears.all();
      });

      this.get("/api/cartitems", (schema) => {
        return schema.cartitems.all();
      });
      this.post("/api/cartitems", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        console.log("hello", attrs);
        return schema.cartitems.create(attrs.cartitem);
      });

      this.get("/api/shoes", (schema) => {
        return schema.shoes.all();
      });

      this.get("/api/gymessentials", (schema) => {
        return schema.gymessentials.all();
      });
      this.get("/api/supplements", (schema) => {
        return schema.supplements.all();
      });
      this.get("/api/foodanddrinks", (schema) => {
        return schema.foodanddrinks.all();
      });
    }
  });
};
