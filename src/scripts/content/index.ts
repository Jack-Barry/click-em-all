import { onMessage, sendMessage } from "webext-bridge/content-script";
import {
  Clicker,
  ClickerTargetStrategyType,
  type ClickerTarget,
} from "../../lib/Clicker/Clicker";
import { ClickerEvent, ClickerEventType } from "../../lib/Clicker/ClickerEvent";

console.log("🏁 Initializing Click 'em All...");

const clicker = new Clicker();
clicker.addEventListener(ClickerEventType.beginClicking, (e) => {
  sendClickEmAllEventToPopup(e as ClickerEvent<ClickerEventType.beginClicking>);
});

clicker.addEventListener(ClickerEventType.endClicking, (e) => {
  sendClickEmAllEventToPopup(e as ClickerEvent<ClickerEventType.endClicking>);
});

clicker.addEventListener(ClickerEventType.foundElements, (e) => {
  sendClickEmAllEventToPopup(e as ClickerEvent<ClickerEventType.foundElements>);
});

clicker.addEventListener(ClickerEventType.maxClicksReached, (e) => {
  sendClickEmAllEventToPopup(
    e as ClickerEvent<ClickerEventType.maxClicksReached>
  );
});

clicker.addEventListener(ClickerEventType.clickedElements, (e) => {
  sendClickEmAllEventToPopup(
    e as ClickerEvent<ClickerEventType.clickedElements>
  );
});

onMessage("clickEmAll", async (msg) => {
  console.log("🔨 Clickin' 'em all");

  console.log({ msg });
  await clicker.clickEmAll(msg.data as ClickerTarget[]);
});

console.log("Click 'em All Initialized 🤘");

function sendClickEmAllEventToPopup(event: ClickerEvent<ClickerEventType>) {
  sendMessage(
    "clickEmAllEvent",
    { type: event.type, detail: event.detail },
    "popup"
  );
}