import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import utilsSytles from '../styles/utils.module.css'
import alertStyles from '../styles/alert.module.css'
import useSWR from 'swr'
import Collapsible from 'react-collapsible';

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
  var statusHTML = [];

  if (data.length <= 0)
    return (
      <div>
        <h1 className={alertStyles.error}>Unable to print status</h1>
      </div>
    )

  for (let i = 0; i < data.length; i++) {
    //console.log(data[i].name);
    if (!(data[i].name).includes('Tenant'))
    {
      statusHTML.push(<h1>{data[i].name}</h1>)
      statusHTML.push(<h1 className={data[i].status == 'STATUS_OK' ? alertStyles.success :  alertStyles.error}>{data[i].status}</h1>)

      var image = '/images/error.png'

      if (data[i].status == 'STATUS_OK')
        image = '/images/success.png'

      statusHTML.push(<Image alt='Success' src={image} height='36' width='36' />)
    }
  }

  var temp = [];
  temp.push(<h1>temp</h1>);

  var statusHTML2 = (
    <div>
      <h1>
        <div className={data[0].status == 'STATUS_OK' && data[1].status == 'STATUS_OK' && data[2].status == 'STATUS_OK' && data[3].status == 'STATUS_OK' ? alertStyles.success : alertStyles.error}>Developer Studio</div>
        &nbsp; &nbsp; Status
        &nbsp; &nbsp; <Image alt='Success' src="/images/success.png" height='36' width='36' />
      </h1>

      <h1 className={utilsSytles.headingMd}>Features</h1>
      <h1>
        <div className={data[2].status == 'STATUS_OK2' ? alertStyles.success : alertStyles.error}>Accounts</div>
        &nbsp; &nbsp; Status
        &nbsp; &nbsp; <Image alt='Error' src="/images/error.png" height='36' width='36' />
      </h1>
      <h1>
        <div className={data[2].status == 'STATUS_OK' ? alertStyles.success : alertStyles.error}>Search</div>
        &nbsp; &nbsp; Status
        &nbsp; &nbsp; <Image alt='Error' src="/images/error.png" height='36' width='36' />
      </h1>
    </div>
  )

  return (
    <div>
      {statusHTML2}

      <div>
        <Collapsible trigger="Nerdy Details" className={utilsSytles.heading2Xl}>
          <h1>
            <div className={data[4].status == 'STATUS_OK2' ? alertStyles.success : alertStyles.error}>Marketplace Integration</div>
            &nbsp; &nbsp; Status
            &nbsp; &nbsp; <Image alt='Error' src="/images/error.png" height='36' width='36' />
          </h1>

          <h1>
            <div className={data[3].status == 'STATUS_OK' ? alertStyles.success : alertStyles.error}>Redis</div>
            &nbsp; &nbsp; Status
            &nbsp; &nbsp; <Image alt='Error' src="/images/success.png" height='36' width='36' />
          </h1>

          {statusHTML}
        </Collapsible>
      </div>
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
