<template>
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    <div class="top-row">
      <div class="top part">
        <div class="robot-name">
          {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>
        <img :src="selectedRobot.head.src" title="head"/>
        <button @click="selectPreviousHead()" class="prev-selector">&#9668;</button>
        <button @click="selectNextHead()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" title="leftarm"/>
        <button @click="selectPreviousLeftArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextLeftArm()" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" title="torso"/>
        <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
        <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" title="rightarm"/>
        <button @click="selectPreviousRightArm()" class="prev-selector">&#9650;</button>
        <button @click="selectNextRightArm()" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.bases.src" title="base"/>
        <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
        <button @click="selectNextBase()" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
        <tr>
          <th>Robot</th>
          <th class="cost">Cost</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(robot, index) in cart" :key="index">
          <td>{{robot.head.title}}</td>
          <td class="cost">{{robot.cost}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import availableParts from '../data/parts';

function getPreviousValidIndex(index, length) {
  const deprecatedIndex = index - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
}

function getNextValidIndex(index, length) {
  const incrementedIndex = index + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
}

export default{
  name: 'RobotBuilder',
  data() {
    return {
      availableParts,
      cart: [],
      selectLeftArmIndex: 0,
      selectRightArmIndex: 0,
      selectBaseIndex: 0,
      selectTorsoIndex: 0,
      selectHeadIndex: 0,
    };
  },
  computed: {
    selectedRobot() {
      return {
        head: availableParts.heads[this.selectHeadIndex],
        leftArm: availableParts.arms[this.selectLeftArmIndex],
        torso: availableParts.torsos[this.selectTorsoIndex],
        rightArm: availableParts.arms[this.selectRightArmIndex],
        bases: availableParts.bases[this.selectBaseIndex],
      };
    },
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.torso.cost
        + robot.rightArm.cost
        + robot.base.cost;
      this.cart.push(Object.assign({}, robot, { cost }));
      console.log(this.cart);
    },
    // Here we defines all the functions for the given page
//HEAD
    selectNextHead() {
      this.selectHeadIndex = getNextValidIndex(
        this.selectHeadIndex,
        availableParts.heads.length,
      );
    },
    selectPreviousHead() {
      this.selectHeadIndex = getPreviousValidIndex(
        this.selectHeadIndex,
        availableParts.heads.length,
      );
    },
//RIGHT ARM
    selectNextRightArm() {
      this.selectRightArmIndex = getNextValidIndex(
        this.selectRightArmIndex,
        availableParts.heads.length,
      );
    },
    selectPreviousRightArm() {
      this.selectRightArmIndex = getPreviousValidIndex(
        this.selectRightArmIndex,
        availableParts.heads.length,
      );
    },
//LEFT ARM
    selectNextLeftArm() {
      this.selectLeftArmIndex = getNextValidIndex(
        this.selectLeftArmIndex,
        availableParts.heads.length,
      );
    },
    selectPreviousLeftArm() {
      this.selectLeftArmIndex = getPreviousValidIndex(
        this.selectLeftArmIndex,
        availableParts.heads.length,
      );
    },
//BASE
    selectNextBase() {
      this.selectBaseIndex = getNextValidIndex(
        this.selectBaseIndex,
        availableParts.heads.length,
      );
    },
    selectPreviousBase() {
      this.selectBaseIndex = getPreviousValidIndex(
        this.selectBaseIndex,
        availableParts.heads.length,
      );
    },
//TORSO
    selectNextTorso() {
      this.selectTorsoIndex = getNextValidIndex(
        this.selectTorsoIndex,
        availableParts.heads.length,
      );
    },
    selectPreviousTorso() {
      this.selectTorsoIndex = getPreviousValidIndex(
        this.selectTorsoIndex,
        availableParts.heads.length,
      );
    },
  },
};
</script>

<style>
  .part {
    position: relative;
    width:165px;
    height:165px;
    border: 3px solid #aaa;
  }
  .part img {
    width:165px;
  }
  .top-row {
    display:flex;
    justify-content: space-around;
  }
  .middle-row {
    display:flex;
    justify-content: center;
  }
  .bottom-row {
    display:flex;
    justify-content: space-around;
    border-top: none;
  }
  .head {
    border-bottom: none;
  }
  .left {
    border-right: none;
  }
  .right {
    border-left: none;
  }
  .left img {
    transform: rotate(-90deg);
  }
  .right img {
    transform: rotate(90deg);
  }
  .bottom {
    border-top: none;
  }
  .prev-selector {
    position: absolute;
    z-index:1;
    top: -3px;
    left: -28px;
    width: 25px;
    height: 171px;
  }
  .next-selector {
    position: absolute;
    z-index:1;
    top: -3px;
    right: -28px;
    width: 25px;
    height: 171px;
  }
  .center .prev-selector, .center .next-selector {
    opacity:0.8;
  }
  .left .prev-selector {
    top: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
  .left .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
  .right .prev-selector {
    top: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
  .right .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
  .right .next-selector {
    right: -3px;
  }
  .robot-name{
    position: absolute;
    top: -25px;
    text-align: center;
    width: 100%;
  }
  .sale{
    color: #FF0000;
  }
  .content{
    position: relative;
  }
  .add-to-cart{
    position: absolute;
    right: 30px;
    width: 220px;
    padding: 3px;
    font-size: 16px;
  }
  td, th {
    text-align: left;
    padding: 5px 20px 5px 5px;
  }
  .cost {
    text-align: right;
  }
</style>
