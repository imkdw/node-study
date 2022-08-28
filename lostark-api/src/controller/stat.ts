import { NextFunction, Request, Response } from "express";
import { Puppeteer } from "puppeteer";

class StatController {
  static postItemLevel = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;
    const url = `https://lostark.game.onstove.com/Profile/Character/${username}`;

    // const itemLevel = await getTextFromDriver(driver, "level-info2__expedition");
    // const defaultStat = await getTextFromDriver(driver, "profile-ability-basic");
    // const fightStat = await getTextFromDriver(driver, "profile-ability-battle");

    const statData = {};

    res.json(statData);
  };
}

export default StatController;
