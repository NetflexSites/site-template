<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
  </head>
  <body>
    <? get_block('Style') ?>
    <div id="app">
      <img src="<?= get_asset('logo.png') ?>">
      <? get_block('HelloWorld') ?>
    </div>
  </body>
</html>
