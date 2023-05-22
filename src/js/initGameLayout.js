const initGameLayout = () => {
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<main class="wrapper">
      <h1 class="title">Minesweeper</h1>
      <label class="switch">
      <input type="checkbox" id='switch'>
      <span class="slider"></span>
      </label>
      <div class="score">
      <div class="count flag">000</div>
      <button class="restart">🙂</button>
      <div class="count timer">000</div>
      </div>
        <div class="root">
      </div>
        <div class="settings">
        <div class="size">
         <label id="labelSize" for="size">Level</label>
         <div class="select-wrapper">
          <select id="level" name=level class="select">
           <option value="easy" selected>Easy(10x10)</option>
           <option value="medium" >Medium(15x15)</option>
          <option value="hard">Hard(25x25)</option>
         </select> 
          </div>
          </div>
         <div class="bombs">
          <label id="labelRange" for="bombs">Bombs Count(10-99)</label>
          <div class="bombs-input">
           <input type="range" name="bombs" value='10' min="10" max="99" id="bombs"/>
           <span id="bombs-value"></span>
           </div>
         </div>
        </div>
    </main>`
    )
}

export { initGameLayout }
