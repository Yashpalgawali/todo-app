
const person = {
    name : 'Yashpal',
    address : {
                line1: '123 Bakers street',
                city: 'London',
                country : 'UK'
            },
    profile: ['instagram','twitter','facebook'],
    printProfile: () => {
        person.profile.map((pr)=> {
            console.log(pr)
        }) 
       // console.log(person.profile[2])
    }
}

  

export default function LearningJavascript() {
    return(
        <div>
            <div> {person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.address.city}</div>
            <div>{person.address.country}</div>
            <div>{person.profile[0]}</div>
            <div>{person.printProfile()}</div>
        </div>
    )
}