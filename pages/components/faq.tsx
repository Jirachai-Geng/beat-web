import { NextPage } from 'next';
import { Fragment, MutableRefObject, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from '../../styles/Faq.module.css'
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useTranslation } from 'react-i18next';


export const useContainerDimensions = (myRef: any) => {
  const getDimensions = () => ({
    width: myRef.current.offsetWidth,
    height: myRef.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      setDimensions(getDimensions())
    }

    if (myRef.current) {
      setDimensions(getDimensions())
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [myRef])

  return dimensions;
};

const resources = {
  us: {
    translation: {
      title_whatBEAT: 'BEAT Active is?',
      text_whatBEAT: '"Good Health & Well Being" is what BEAT Active is all about.You can live a healthy and fulfilling life no matter who you are.Through all of the activities we have designed for everyone, we desire to raise your quality of life.BEAT Active wishes that everyone share the same values and goals.Dare to take on a new challenge and better yourself. Limitless living at BEAT Active.We are ready to empower everyone work together to achieve the goal.',
      
      text_q1: 'Who may participate in activities in BEAT Active?',
      text_aws1: 'Activities in BEAT Active are open to everyone. We provide 55 different activities that are appropriate for all ages.',

      text_q2: 'How many kinds of BEAT Active ticket?',
      text_aws2: 'BEAT Active tickets are divided into 4 categories based on activity zones: Kids Zone (16 activities), Novice Zone (23 activities), Advance Zone (34 activities), Extreme Zone (39 activities).',

      text_q3: 'How to join the THAI FIGHT League matches?',
      text_aws3: 'The price of an activity ticket does not include admission to THAI FIGHT League matches. Tickets for the THAI FIGHT League and THAI FIGHT Passport must be purchased separately.',

      text_q4: 'What is BEAT Active operating hours?',
      text_aws4: 'BEAT Active is open every day including public holidays. The opening hours are 9:00 a.m. - 9:00 p.m.',

      text_q5: 'Do I have to bring my own equipment for the activity?',
      text_aws5: 'BEAT Active already prepared the equipment for all activities.  However, some activities require you to wear specialized, non-slip socks, which you can purchase additional at the venue.',
    }
  },
  th: {
    translation: {
      title_whatBEAT: 'BEAT Active is?',
      text_whatBEAT: "ไม่ว่าคุณจะเป็นใครก็สามารถสุขภาพดีและมีประสิทธิภาพการใช้ชีวิตที่ดีได้เราขอร่วมเป็นส่วนหนึ่งในการส่งเสริมคุณภาพชีวิตของคุณ ผ่านกิจกรรมทั้งหมดที่เราได้จัดสรรให้กับทุกคน BEAT Active อยากให้ทุกคนมีความเชื่อและเป้าหมายเดียวกันกล้าที่จะท้าทายกับสิ่งใหม่ๆ ไม่กลัวที่จะพัฒนาตนเอง ใช้ชีวิตอย่างไร้ขีดจำกัดที่ BEAT Active พร้อมที่จะสนับสนุนขับเคลื่อนไปพร้อมกับทุกคนเพื่อบรรลุเป้าหมายไปพร้อมกัน",
      
      text_q1: 'ใครสามารถเล่นกิจกรรมภายใน BEAT Active ได้บ้าง?',
      text_aws1: 'ใครก็สามารถทำกิจกรรมภายใน BEAT Active ได้ ไม่ว่าคุณจะเป็นมือสมัครเล่น คนที่ชอบการออกกำลังกาย คนที่ต้องการหากิจกรรมทำ หรือนักกีฬาก็สามารถเข้าร่วมกิจกรรมได้ เนื่องจาก BEAT Active มีกิจกรรมที่หลากหลายถึง 55 กิจกรรมที่เตรียมไว้ให้ทุกคน',

      text_q2: 'บัตรของ BEAT Active มีอะไรบ้าง?',
      text_aws2: 'บัตรเข้า BEAT Active ถูกแบ่งออกเป็น 4 ประเภทตามโซนของกิจกรรม ได้แก่ Kids Zone (16 กิจกรรม), Novice Zone (23 กิจกรรม), Advance Zone (34 กิจกรรม), Extreme Zone (39 กิจกรรม)',

      text_q3: 'หากต้องการดูการแข่งขัน THAI FIGHT League ต้องทำอย่างไร?',
      text_aws3: 'การรับชมการแข่งขัน THAI FIGHT League ไม่ถูกนับรวมกับบัตรเข้าทำกิจกรรม ต้องซื้อบัตรสำหรับการเข้าชม THAI FIGHT League โดยเฉพาะ รวมถึงบัตร THAI FIGHT Psysport เช่นกัน',

      text_q4: 'BEAT Active เปิดทำการวันไหนบ้าง?',
      text_aws4: 'BEAT Active เปิดให้บริการทุกวัน ไม่เว้นวันหยุดนักขัตฤกษ์ โดยเวลาทำการคือ 9.00 - 21.00 น.',

      text_q5: 'ต้องเตรียมอุปกรณ์สำหรับทำกิจกรรมมาเองหรือไม่?',
      text_aws5: 'ภายใน BEAT Active ได้เตรียมอุปกรณ์สำหรับทำกิจกรรมทุกอย่างให้เรียบร้อยแล้ว มีเพียงแค่ถุงเท้ากันลื่นที่ต้องชำระเงินเพิ่มเติม เนื่องจากทางเราขอสงวนสิทธิ์ให้ใช้แค่ถุงเท้าของเราเท่านั้นเพื่อความปลอดภัย'
    }
  },
  cn: {
    translation: {
      title_whatBEAT: 'BEAT Active 是什么？',
      text_whatBEAT: 'BEAT Active相信健康与福祉方式。不管你是谁、你也会有健康与幸福的生活。我们希望能其中提升你们的生活之一、通过我们全部的娱乐活动。BEAT Active 希望在我们这里，大家有理念和目标、勇敢和挑战自己、不怕的提升自己和过无极限的生活。我们会支持与推动大家一起走到目标',
      
      text_q1: '谁能参加我们BEAT Active的活动？',
      text_aws1: '无论您是业余者、喜欢运动的人、喜欢寻找新活动的人还是运动员，您都可以加入我们的活动。 因为BEAT Active给您准备了 55 种活动',

      text_q2: 'BEAT Active的票价是怎么样？',
      text_aws2: '因为我们BEAT Active分出四个活动区加一所以我们的票价分出四种票如下：儿童票（16种活动）、新手票（23种活动）、高手票（34种活动）和极限票（39种活动',

      text_q3: '如果想看泰拳比赛节目需要买哪种票呢？',
      text_aws3: '因为泰拳比赛节目包括泰拳课不计入活动票，必须特定购买门票',

      text_q4: 'BEAT Active的营业时间？',
      text_aws4: '星期一到星期日、早上9点营业到晚上9点。',

      text_q5: '进入参加BEAT Active的活动需要自己准备设备吗？',
      text_aws5: 'BEAT Active已准备好每种活动的设备，只要额外付防滑袜的用费。为了您的安全，我们需要保留仅使用我们袜子的权利。',
    }
  }
};

interface EventProps {
  language: string;
}
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'us', // default language
  });


const Faq = () => {
  const { t } = useTranslation();

  return(
    <div >
      <Container fluid style={{ paddingLeft: '175px', paddingBottom: '88px'}}>
        <p className={styles.text_title}> {t('title_whatBEAT')} </p>
        <p style={{paddingTop: '20px'}} className={styles.text}> {t('text_whatBEAT')} </p>

        <p style={{paddingTop: '128px'}} className={styles.text_title}> FAQ </p>

        <p style={{color: '#FFFFFF', paddingTop: '20px', fontWeight: '600'}} className={styles.text}> {t('text_q1')} </p>
        <p className={styles.text_aws}> {t('text_aws1')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('text_q2')} </p>
        <p className={styles.text_aws}> {t('text_aws2')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('text_q3')} </p>
        <p className={styles.text_aws}> {t('text_aws3')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('text_q4')} </p>
        <p className={styles.text_aws}> {t('text_aws4')} </p>

        <p style={{color: '#FFFFFF', fontWeight: '600'}} className={styles.text}> {t('text_q5')} </p>
        <p className={styles.text_aws}> {t('text_aws5')} </p>
      </Container>
    </div >
  );
};


export default Faq;