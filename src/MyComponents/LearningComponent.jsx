
import  FirstComponent from './FirstComponent';
import  SecondComponent from './SecondComponent';
import  ThirdComponent from  './ThirdComponent';
import  FourthComponent from './FourthComponent';
import { FifthComponent } from './FirstComponent';
import LearningJavascript from './LearningJavascript';
import Counter from './Counter/Counter';

export default function LearningComponent () {
    return (
             <div className="LearningComponent">
                    My First Application react
                    <FirstComponent  />
                    <SecondComponent />
                    <ThirdComponent  />
                    <FourthComponent />
                    <FifthComponent />
                    <LearningJavascript />
                    <Counter />
               </div>
            );
    }