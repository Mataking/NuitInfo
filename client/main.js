import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

filtre = "";


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});
https://github.com/Mataking/NuitInfo.git
Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});


Template.orienter.onCreated(function orienterOnCreated() {
 // counter starts at ""
 this.counter = new ReactiveVar("");
});
https://github.com/Mataking/NuitInfo.git


Template.orienter.events({
 'click .image_orienter_input': function(event, instance){
   filtre = "orienter";
   }
});

Template.occupe.events({
 'click .image_occupe_input': function(event, instance){
   filtre = "occupe";
 }
});

Template.nourrir.events({
 'click .image_nourrir_input': function(event, instance){
   filtre = "nourrir";
 }
});

Template.loger.events({
 'click .image_loger_input':function (event, instance){
   filtre = "loger";
 }
});

Template.soigner.events({
 'click .image_soigner_input':function (event, instance){
   filtre = "soigner";
 }
});

Template.reinserer.events({
 'click .image_reinserer_input':function (event, instance){
   filtre = "reinserer";
 }
});
