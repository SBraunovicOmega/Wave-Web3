const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // ovo upravo kompajlira nas ugovor i generise potrebne fajlove koji nam omogucavaju da radimo sa ugovor u folder artifact
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    // ovdje hardhat pravi lokalnu ethereum mrezu za nas, ali samo za ovaj kontrakt. I nakon sto se skripta izvrsi unisti lokalnu mrezu.
    // tako da svaki put kada izvrsimo skriptu, bice fresh blockchain mreza.
    const waveContract = await waveContractFactory.deploy();

    // ovdje cekamo dok se nas ugovor zvanicno ne diploja na na lokalni blokcejn
    await waveContract.deployed();
    // nakon sto se diploja kao response cemo da dobijemo adresu na koju se diploja ugovor.
    console.log("Contract deployed to:", waveContract.address);
    
    // sa ovim mozemo da vidimo ko je glavni za diplojanje ugovora 
    console.log("Contract deployed by:", owner.address);
    
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    let waveTxn = await waveContract.wave();
     await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();


    //kada neka random osoba nam posalje wave
    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();
  
    waveCount = await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();