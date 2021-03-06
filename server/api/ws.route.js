const Router = require("express").Router;
const authenticate = require("./middleware/authenticate");
const gameParticipant = require("./middleware/gameParticipant");
const gameService = require("../services/game");

module.exports = (app) => {
  const router = Router();

  router.ws("/usernames", (ws, req) => {
    console.log(`usernames WebSocket opened for user ${req.session.username}`);
    const result = gameService.getUsernames(req.session, ws);
    ws.on("message", () => {
      console.log("GGGGUSER");
      req.session.reload(async (err) => {
        if (err) {
          console.log("req.session.reload error");
          return;
        }
        gameService.getUsernames(req.session, ws);
      });
    });
    ws.on("close", () => {
      console.log(`usernames ws was closed for user ${req.session.username}`);
    });
  });

  // router.ws("/number", (ws, req) => {
  //   gameService.subscribeNumbers(req.session, ws);
  //   ws.on("message", () => {});
  //   ws.on("close", () => {
  //     console.log(
  //       `number WebSocket was closed for user ${req.session.username}`
  //     );
  //   });
  // });

  // router.ws("/available_cards", (ws, req) => {
  //   gameService.availableCards(req.session, ws);
  //   ws.on("message", () => {});
  //   ws.on("close", () => {
  //     console.log(
  //       `available_cards WebSocket was closed for user ${req.session.username}`
  //     );
  //   });
  // });

  // router.ws("/win", (ws, req) => {
  //   gameService.availableCards(req.session, ws);
  //   ws.on("message", () => {});
  //   ws.on("close", () => {
  //     console.log(
  //       `available_cards WebSocket was closed for user ${req.session.username}`
  //     );
  //   });
  // });

  router.ws("/", (ws, req) => {
    console.log(`WS for ${req.session.username} opened`);
    ws.on("message", (e) => {
      req.session.reload(async (err) => {
        if (err) {
          console.log("req.session.reload error");
          return;
        }
        const data = JSON.parse(e);
        const type = data.type;
        console.log(
          `ws rec message type is ${type} from user ${req.session.username}`
        );
        if (type === "availableGames") {
          gameService.removeUserFromGame(req.session);
          gameService.availableGames(req.session, ws);
        } else if (type === "availableGamesStop") {
          gameService.availableGamesStop(req.session, ws);
        } else if (type === "availableCards") {
          await gameService.getAllCards(req.session, ws);
          gameService.availableCards(req.session, ws);
        } else if (type === "availableCardsStop") {
          gameService.availableCardsStop(req.session, ws);
        } else if (type === "number") {
          gameService.subscribeNumbers(req.session, ws);
        } else if (type === "numberStop") {
          gameService.unsubscribeNumbers(req.session, ws);
        }
      });
    });
    ws.on("close", () => {
      console.log(`ONE WebSocket from ${req.session.username} closed`);
    });
  });

  // app.use("/ws", authenticate, gameParticipant, router);
  app.use("/ws", authenticate, router);
  //   app.use("/ws", router);
};
