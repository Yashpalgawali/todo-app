
const person = {
    name : 'Dante',
    skill: 'Demon,Skirmish',
    address : {
        line1 : 'Limbo',
        line2 : 'Bakers Street'
    },
    profiles : ['twitter','LinkedIn'],
    printProfile : ()=> {
        person.profiles.map(
            profile => console.log(profile)
        );
        
    }
}

export default function LearningJavascript (){
    return(
        <>
        <div >  {person.name}  </div>
        <div>{person.skill}</div>
        <div>{person.address.line1}  {person.address.line2}</div>
        <div>{person.profiles[0]}</div>
        <div>{person.printProfile()}</div>
        </>
    );

}