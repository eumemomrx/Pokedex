const pokemonName = document.querySelector('.pokemon_name');
const pokemonImg =document.querySelector('.pokemon_image');
const pokemonId = document.querySelector('.pokemon_id');

const form = document.querySelector('form');
const input =document.querySelector('.input_search');
const buttonA = document.querySelector('.btn-ant');
const buttonP = document.querySelector('.btn-prx');

let searchPokemon = 1;

const fetchPokemon = async (pokemon)=>{
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
if(APIResponse.status==200){
    const data = await APIResponse.json();
    return data;   
}

}
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando';
    pokemonId.innerHTML ='';
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';  
        searchPokemon = data.id
    }else{
        pokemonName.innerHTML = 'Não encontrado';
        pokemonId.innerHTML =  '';
        pokemonImg.style.display = 'none';
    }
    
}
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});
buttonA.addEventListener('click', ()=>{
    if(searchPokemon>1){
        searchPokemon-= 1;
        renderPokemon(searchPokemon);
    }
});
buttonP.addEventListener('click', ()=>{
    if(searchPokemon<649){
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});
renderPokemon(searchPokemon);