export default async function getCountries(req, res) {
  try {
    res.status(200).send('post hander');
  } catch (e) {
    __LOGGER__.error('Handler test error: ', e);
    res.status(420).send({
      error: e.message,
      success: false
    });
  }
}
