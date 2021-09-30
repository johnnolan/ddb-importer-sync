Hooks.once("init", async function () {
  console.log("DDB Importer Auto Sync | Initializing DDB Importer Auto Sync");
});

Hooks.on("updateActor", async function (data, diff) {
  if (!game.user.isGM) return false;

  if (data.data.type === "character") {
    if (diff.data?.attributes?.hp || diff.data?.spells || diff.data?.currency) {
      console.log("DDB Importer Auto Sync | updateActor Triggered");
      sync(data.data._id);
    } else {
      console.log("DDB Importer Auto Sync | updateActor Not Triggered");
    }
  }
});

Hooks.on("deleteItem", async function (data, diff, actorId) {
  if (!game.user.isGM) return false;
  sync(data.parent.data._id);
});

Hooks.on("createItem", async function (data, diff, actorId) {
  if (!game.user.isGM) return false;
  sync(data.parent.data._id);
});

function sync(actorId) {
  console.log("DDB Importer Auto Sync | Syncing");
  const actor = game.actors.get(actorId);
  DDBImporter.updateDDBCharacter(actor);
}
