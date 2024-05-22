const predictClassification = require("../services/inferenceService");
const storeData = require("../services/storeData");
const loadData = require("../services/loadData");
const crypto = require("crypto");

async function predictHandlerReq(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, data);

  return h
    .response({
      status: "success",
      message: "Model is predicted successfully",
      data: data,
    })
    .code(201);
}

async function predictHistoriesReq(request, h) {
  try {
    const data = await loadData();
    return h.response({
        status: "success",
        data: data,
      }).code(200);

  } catch (error) {
    return h.response({
        status: "fail",
        message: "failed to get prediction histories",
      }).code(500);
  }
}

module.exports = { predictHandlerReq, predictHistoriesReq };