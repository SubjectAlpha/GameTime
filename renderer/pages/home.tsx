import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import electron from 'electron';

function Home() {

    const ipcRenderer = electron.ipcRenderer || false;

    let clickHandler = () => {
        console.log("ipcRenderer not loaded");
    }

    if(ipcRenderer){
        ipcRenderer.on("create-movie-r", (e, arg) => {
            console.log(arg);
        });

        clickHandler = () => {
            console.log("sending game")
            ipcRenderer.send("create-game");
        }
    }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-tailwindcss)</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Electron ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/next'>
          <a className='btn-blue'>Go to next page</a>
        </Link>
      </div>
      <button className="btn-blue" onClick={clickHandler}>Create Game</button>
    </React.Fragment>
  );
}

export default Home;
