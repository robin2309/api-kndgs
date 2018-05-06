export default async function testHandler(req, res) {
  try {
    res.status(200).send('Test hander');
  } catch (e) {
    global.__LOGGER__.error('Handler test error: ', e);
    res.status(420).send({
      error: e.message,
      success: false
    });
  }
}
