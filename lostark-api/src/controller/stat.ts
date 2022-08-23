import { NextFunction, Request, Response } from "express";
import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import path from "path";

const getTextFromDriver = async (driver: any, className: string) => {
  const text = await driver.findElement(By.className(className)).getText();
  return text;
};

class StatController {
  static postItemLevel = async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.body;

    const url = `https://lostark.game.onstove.com/Profile/Character/${username}`;
    const driverPath = path.join(__dirname, "..", "..", "chromedriver.exe");

    const service = new chrome.ServiceBuilder(driverPath);
    const driver = new Builder().forBrowser("chrome").setChromeService(service).build();

    await driver.get(url);

    const itemLevel = await getTextFromDriver(driver, "level-info2__expedition");
    const defaultStat = await getTextFromDriver(driver, "profile-ability-basic");
    const fightStat = await getTextFromDriver(driver, "profile-ability-battle");

    const response = {
      itemLevel,
      defaultStat,
      fightStat,
    };

    res.json(response);
  };
}

export default StatController;
