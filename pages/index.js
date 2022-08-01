import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import utilsSytles from '../styles/utils.module.css'
import alertStyles from '../styles/alert.module.css'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

/*
- cannot be order dependent when looking at helathcheck data
- studio is up if: UI + DB + Search ??
*/
function Healthcheck() {

  const { data, error } = useSWR('https://dev-developer.fiserv.com/api/healthcheck', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log(data)

  var colorStyle = 'color: red';
  var statusHTML = '';

  if (data.length <= 0)
    return (
      <div>
        <h1 className={alertStyles.error}>Unable to print status</h1>
      </div>
    )

  for (let i = 0; i < data.length; i++) {
    //console.log(data[i].name);

    statusHTML += (<h1> + data[i].name + </h1>)

    if (data[i].status == 'STATUS_OK')
      colorStyle = 'color: green';
    else
      colorStyle = 'color: red';
    
    //statusHTML += <h1 className={colorStyle}> + data[i].status + </h1>;
  }

  var statusHTML2 = (
    <div>
      <h1>
        <div className={data[0].status == 'STATUS_OK' && data[1].status == 'STATUS_OK' && data[2].status == 'STATUS_OK' && data[3].status == 'STATUS_OK' ? alertStyles.success : alertStyles.error}>Developer Studio</div>
        &nbsp; &nbsp; Status
        &nbsp; &nbsp; <Image alt='Success' src="/images/success.png" height='36' width='36' />
      </h1>

      <h1 className={utilsSytles.headingMd}>Features</h1>
      <h1>
        <div className={data[2].status == 'STATUS_OK' ? alertStyles.success : alertStyles.error}>Search</div>
        &nbsp; &nbsp; Status
        &nbsp; &nbsp; <Image alt='Error' src="/images/error.png" height='36' width='36' />
      </h1>


    </div>
  )

  return (
    <div>
      {statusHTML}
      {statusHTML2}
    </div>
  )
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Image alt="Fiserv Developer Studio" src="/images/logo.jpg" height='162' width='740'/>
      <h1 className={utilsSytles.heading2Xl}>Fiserv Developer Studio Status Page</h1>
      
      <Healthcheck />

      <h2 className={utilsSytles.headingLg}>
        <Link href="https://twitter.com/fiservdevstudio">
          <a>Get the latest updates on Twitter @fiservdevstudio.</a>
        </Link>
      </h2>

      <h2 className={utilsSytles.headingLg}>
        <Link href="https://github.com/fiserv/support/discussions">
          <a>Join the conversation on Github Discussions.</a>
        </Link>
      </h2>
    </div>
  )
}
