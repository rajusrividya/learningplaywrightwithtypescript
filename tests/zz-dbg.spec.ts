import { test } from "@playwright/test";
test("dbg", async ({ page }) => {
  test.setTimeout(120000);
  page.on("requestfailed", r => console.log("FAIL", r.url()));
  let t = Date.now();
  const log = (s: string) => { console.log(s, Date.now() - t); t = Date.now(); };
  await page.goto("https://the-internet.herokuapp.com/frames"); log("goto");
  await page.getByRole("link", { name: "iFrame" }).click(); log("click");
  await page.waitForLoadState("domcontentloaded"); log("dcl");
  console.log(await page.content().then(c => c.match(/<iframe[^>]*>/g)));
  console.log(page.frames().map(f => f.url()));
  await page.waitForLoadState("load"); log("load");
  for (const f of page.frames()) console.log(f.url(), (await f.locator("body").innerHTML().catch(e=>"ERR")).slice(0,300));
});
