'use strict';
$(() => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };
  $.ajax('./data/page-1.json', ajaxSettings)
    .then((data) => {
      const arrayOfCreatures = data;
      arrayOfCreatures.forEach((creature) => {
        const actualCreature = new Creature(creature);
        Creature.all.push(actualCreature);
      });
    })
    .then(() => {
      renderCreature();
    });
});
function Creature(creature) {
  this.title = creature.title,
  this.keyword = creature.keyword,
  this.image_url = creature.image_url,
  this.description = creature.description,
  this.horns = creature.horns;
}
Creature.all = [];
Creature.prototype.render = function () {
  let $renderedCreature = $('.creature-template').clone();
  $renderedCreature.removeClass('creature-template');
  $renderedCreature.find('.title').text(this.title);
  // $renderedCreature.find('.keyword').text(this.keyword);
  //$renderedCreature.find('.horns').text(this.horns);
  $renderedCreature.find('.image_url').attr('src', this.image_url);
  $renderedCreature.find('.image_url').attr('alt', this.title);
  $renderedCreature.find('.description').text(`${this.description}`);
  return $renderedCreature;
};
function renderCreature() {
  Creature.all.forEach(creature => $('#photo-gallery').append(creature.render()));
  $('.creature-template').remove();
}