document.addEventListener('DOMContentLoaded', ()=>{
    const images =[
        {
        name: 'axe',
        img:'images/axe.png'
        },
        {
        name: 'sword',
        img:'images/sword.png'
        },
        {
        name: 'shield',
        img:'images/shield.png'
        },
        {
        name: 'pike',
        img:'images/pike.png'
        },
        {
        name: 'mace',
        img:'images/mace.png'
        },
        {
        name: 'dagger',
        img:'images/dagger.png'
        },
        {
        name: 'crossbow',
        img:'images/crossbow.png'
        },
        {
        name: 'bow',
        img:'images/bow.png'
        },
        {
        name: 'axe',
        img:'images/axe.png'
        },
        {
        name: 'sword',
        img:'images/sword.png'
        },
        {
        name: 'shield',
        img:'images/shield.png'
        },
        {
        name: 'pike',
        img:'images/pike.png'
        },
        {
        name: 'mace',
        img:'images/mace.png'
        },
        {
        name: 'dagger',
        img:'images/dagger.png'
        },
        {
        name: 'crossbow',
        img:'images/crossbow.png'
        },
        {
        name: 'bow',
        img:'images/bow.png'
        }
        
    ]

    shuffle(images);

    const panel =document.querySelector('.panel')
    var imagesChosen = []
    var imagesChosenNr = []
    var imagesMatched = []

    const resultDisplay=document.querySelector('#score')

    function create(){
        for(let i=0; i<images.length; i++){
            var image = document.createElement('img')
            image.setAttribute('src', 'images/blank.png')
            image.setAttribute('id', i)
            image.addEventListener('click', flip)
            panel.appendChild(image)
        }
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }

    function generateButton(){
        var button = document.createElement("button");
        button.innerHTML = "Zagraj Ponownie!";
        var again = document.getElementById('again');
        again.appendChild(button);
        
        button.addEventListener("click", function(){
            location.reload();
        })

    }

    function checForkMatch(){
        var img = document.querySelectorAll('img')
        const optionOneId = imagesChosenNr[0]
        const optionTwoId = imagesChosenNr[1]
        if(imagesChosen[0]===imagesChosen[1]){
            alert('Znalazłeś parę')
            img[optionOneId].setAttribute('src', 'images/empty.png')
            img[optionOneId].removeEventListener('click', flip)
            img[optionTwoId].setAttribute('src', 'images/empty.png')
            img[optionTwoId].removeEventListener('click', flip)
            imagesMatched.push(imagesChosen[0])
        }else{
            img[optionOneId].setAttribute('src', 'images/blank.png')
            img[optionTwoId].setAttribute('src', 'images/blank.png')
            alert('Nie udało się')
        }
        imagesChosen.splice(0, imagesChosen.length)
        imagesChosenNr.splice(0, imagesChosenNr.length)

        
        resultDisplay.textContent = imagesMatched.length
        if(imagesMatched.length===8){
            generateButton()
        }
    }

    function flip(){
        var imageNr=this.getAttribute('id')
        imagesChosen.push(images[imageNr].name)
        imagesChosenNr.push(imageNr)
        this.setAttribute('src', images[imageNr].img)
        if(imagesChosen.length===2){
            setTimeout(checForkMatch, 100)
        }
    }

    create()
})