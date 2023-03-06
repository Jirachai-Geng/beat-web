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
      text_kid: 'Take a break from your phone and engage in more enjoyable activities. You may help your children become more physically and mentally fit by engaging them in games like BEAT Racing Active, Active Ball Pit, BEAT the Step, BEAT Space City, and BEAT The Trap Challenge.',
      text_novice: 'Invite your family and friends to try something new; stop having dull days. Because amazing experiences can always happen. The options available from BEAT Active include BEAT EDU, BEAT the Hockey, BEAT Space Pinball, BEAT the Street, BEAT The Ball, and more.',
      text_advance: 'Find new sports just here; forget about exercising the old style outside. Your needs are fully met with BEAT the Ski, BEAT Active jumping, BEAT VR Gaming, and BEAT Active Climbing. In addition to this. There is still a ton of excitement for you!',
      text_extreme: "Not the highest, but never give up; if you jump higher or exert yourself more, you'll get stronger. This is not just a game; it's an extreme battle. You can try BEAT Flying Space, BEAT Boxing Bot, BEAT Military Active, BEAT Landing, BEAT Augmented Wall, and more!",
      text_thaifight: 'Get ready for the biggest hits every week. For your best experience, BEAT Active and THAI FIGHT have properly organized the stage, light, color, and sound. Additionally, the only privileges available here are the close training of boxing with professional boxers.',
    }
  },
  th: {
    translation: {
      text_kid: 'พาลูกออกจากหน้าจอโทรศัพท์ มาทำกิจกรรมแสนสนุก เพิ่มสมรรถภาพทางร่างกาย ฝึกสมาธิ และเสริมสร้างจินตนาการของคุณหนูๆ ด้วยกิจกรรมมากมาย เช่น BEAT Racing Active, Active Ball Pit, BEAT the Step, BEAT Space City, BEAT The Trap Challenge!',
      text_novice: 'จะไม่มีอีกแล้ววันที่แสนน่าเบื่อ ชวนครอบครัวและเพื่อนมาทำอะไรใหม่ๆ เพราะประสบการณ์แสนพิเศษสามารถเกิดขึ้นได้เสมอ BEAT EDU, BEAT the Hockey, BEAT Space Pinball, BEAT the Street, BEAT The Ball และอีกมายมายที่ BEAT Active จัดสรรไว้ให้คุณ',
      text_advance: 'ลืมไปได้เลยกับการเล่นกีฬาในสนามแบบเดิม พบกับการเล่นกีฬารูปแบบใหม่ที่นี่ที่เดียว จัดมาให้อย่างครบครัน สนุก สุดมันส์ได้ไม่มีเบื่อกับ BEAT the Ski, BEAT Active jumping, BEAT VR Gaming, BEAT Active Climbing ยังไม่หมดเพียงเท่านี้ ยังมีความตื่นเต้นอีกมากมายที่รอคุณอยู่!',
      text_extreme: 'อาจจะยังแตะไม่ถึงขอบฟ้า แต่เราไม่ยอมแพ้ กระโดดยิ่งสูงยิ่งแกร่ง ยิ่งแรงยิ่งปัง ไม่ได้แค่สนุก ไม่ใช่แค่กีฬา แต่นี่คือบททดสอบจิตใจไปกับกิจกรรมสุดเร้าใจ BEAT Flying Space, BEAT Boxing Bot, BEAT Military Active, BEAT Landing, BEAT Augmented Wall และอีกหลายกิจกรรมอยากท้าให้คุณได้มาลอง!',
      text_thaifight: 'เตรียมรับมือกับความมันครั้งยิ่งใหญ่ทุกสัปดาห์ได้แล้วที่นี่ BEAT Active และ THAI FIGHT จัดเต็มกับเวที แสง สี และเสียงให้คุณได้สัมผัส พร้อมกับสิทธิสุดพิเศษที่นี่ที่เดียวในการเรียนต่อยมวยกับนักมวยมืออาชีพอย่างใกล้ชิด',
    }
  },
  cn: {
    translation: {
      text_kid: '带您儿子离开手机 来参加我们娱乐活动并提高技能身体与冥想 提升他们的想象力。活动例如：BEAT Racing Active, Active Ball Pit, BEAT the Step, BEAT Space City, BEAT The Trap Challenge 等等',
      text_novice: '没有了无聊的一天， 带您朋友一起来遇见非常奇异的体验 。活动例如：BEAT EDU, BEAT the Hockey, BEAT Space Pinball, BEAT the Street, BEAT The Ball 等等',
      text_advance: '高手区会带你去体验稀奇活动模型，提供完整到这里！活动例如：BEAT the Ski, BEAT Active Jumpimp, BEAT VR Gaming, BEAT Active Climbing 等等',
      text_extreme: '这里不只是极限活动区但还是心理测验可带您遇见激动心的活动。活动例如：BEAT Flying Space, BEAT Boxing Bot, BEAT Military Active, BEAT Landing, BEAT Augmented Wall 等等',
      text_thaifight: '准备好！每周末这里有直播泰拳比赛节目！我们准备了大型舞台和完整的声光系统为充满您的体验。除了泰拳节目，这里还有拳击课由专门的专家教授的特殊特权。',
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


const Service = () => {
  const { t } = useTranslation();

  return(
    <div >
      <Container fluid style={{ paddingLeft: '175px' }}>
        <p className={styles.text_title}> BEAT Active is? </p>
        <p className={styles.text_title}> BEAT Active is? </p>
      </Container>
    </div >
  );
};


export default Service;