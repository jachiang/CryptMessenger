var commander = require('commander');
var readline = require('readline');
var myReadline = readline.createInterface(process.stdin, process.stdout); //theoretically any stream ...

commander
    .version('0.0.1')
    .description('Commander & Readline Combo');
commander
    .command('readline')
    .alias('r')
    .description('activate readline')
    .action(()=>{
        rl();
    })
//commander.parse(process.argv);

var rl = () => {
    myReadline.question('Type your first command> ', (command)=> {
        program(command);
        //every time you enter an aswer it will go here. so rl.close() will trigger program & line ...
        myReadline.on('line',(command) =>{
            if (command.toLowerCase().trim() === 'exit'){
               myReadline.close();
            }
            program(command);
        });
    });
}
//rl(); //i guess if you want to run it explicitly NOW, then it needs to have been defined
var program = (command) => {
    console.log(command);
    myReadline.setPrompt('Standard Prompt> ');
    myReadline.prompt();
};
myReadline.on('close', () => {
    process.exit();
});

commander.parse(process.argv);
