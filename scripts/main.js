Hooks.once("init", async function () {
  console.log("DDB Importer Auto Sync | Initializing DDB Importer Auto Sync");
});

Hooks.on("updateActor", async function (data, diff) {
  if (data.data.type === "character") {
    console.log("DDB Importer Auto Sync | updateActor data", data);
    console.log("DDB Importer Auto Sync | updateActor diff", diff);
    const actor = game.actors.get(data.data._id);
    if (diff.data?.attributes?.hp || diff.data?.spells) {
      console.log("DDB Importer Auto Sync | updateActor Triggered");
      DDBImporter.updateDDBCharacter(actor);
    } else {
      console.log("DDB Importer Auto Sync | updateActor Not Triggered");
    }
  }
});
