export const ko = {
  landing: {
    badge: "Connecto MVP 버전 1.0",
    title1: "휴먼 터치가 더해진",
    title2: "AI 컨설팅 에이전시",
    description: "머릿속에 맴도는 막연한 비즈니스 고민을 명확한 진단과 전략, 그리고 실무에 즉시 쓸 수 있는 결과물로 변환해 드립니다.",
    startBtn: "컨설팅 시작하기",
    agentBtn: "에이전트 대시보드",
    feature1: {
      title: "스마트 진단 (Smart Diagnosis)",
      desc: "단순히 말을 받아 적지 않습니다. 시니어 컨설턴트의 시각으로 고객님의 진짜 문제를 날카롭게 재정의합니다."
    },
    feature2: {
      title: "즉시 실행 가능한 산출물",
      desc: "이메일 초안, 브랜드 소개문, 프로젝트 범위안 등 실무에 바로 활용할 수 있는 결과물을 도출합니다."
    },
    feature3: {
      title: "전문가 PM 리뷰",
      desc: "AI가 놓칠 수 있는 감정적 뉘앙스와 디테일을 경험 풍부한 전문가 PM이 직접 검수하고 다듬어 완성도를 극대화합니다."
    }
  },
  intake: {
    back: "홈으로 돌아가기",
    title: "새로운 컨설팅 의뢰",
    description: "브랜드, 비즈니스, 커뮤니케이션에 관한 어떤 고민이든 자유롭게 털어놓아 보세요. Connecto의 AI 컨설턴트가 핵심 문제를 진단해 드립니다.",
    label: "지금 겪고 있는 가장 큰 고민은 무엇인가요?",
    placeholder: "예) 혁신적인 B2B SaaS 솔루션을 만들었는데, 고객들은 우리 홈페이지가 뻔하다고 하네요. 어떻게 차별화해야 할까요?",
    analyzing: "입력해주신 내용은 Connecto의 독자적인 컨설팅 프레임워크를 통해 분석됩니다.",
    button: "문제 진단하기",
    cats: [
      { t: "브랜드 포지셔닝", d: "우리만의 확실한 차별화 포인트와 핵심 메시지를 도출합니다." },
      { t: "클라이언트 커뮤니케이션", d: "우아하고 단호하게 예산과 범위를 방어하는 소통을 돕습니다." },
      { t: "프로젝트 스코프 기획", d: "정리 안 된 모호한 아이디어들을 명확한 실행 계획으로 구조화합니다." }
    ]
  },
  workspace: {
    title: "컨설팅 워크스페이스",
    stage: "진행 단계",
    status: "현재 상태",
    input: "초기 의뢰 내용",
    diagnosisTitle: "AI 컨설턴트 진단",
    genDiagBtn: "진단 시작하기",
    probRef: "문제 재정의 (Root Cause)",
    cat: "진단 카테고리",
    bizStage: "추정 비즈니스 단계",
    priorities: "해결 우선순위 Top 3",
    diagPending: "진단이 대기 중입니다. 버튼을 눌러 분석을 시작하세요.",
    delivTitle: "전략 산출물",
    genBtnPrefix: "생성: ",
    generating: "AI가 산출물을 작성하고 있습니다...",
    noDeliv: "아직 생성된 산출물이 없습니다.",
    pmTitle: "PM 검수 현황",
    pmWaiting: "내부 전문가 PM의 리뷰를 기다리고 있습니다.",
    generateFailed: "산출물 생성에 실패했습니다.",
    btnSaveMsg: "저장하기",
    guestError: "케이스 접수에 실패했습니다. Supabase 설정을 확인해주세요."
  },
  agent: {
    title: "PM 검수 대시보드",
    colId: "Case ID / 의뢰 요약",
    colClient: "클라이언트",
    colStage: "단계",
    colStatus: "상태",
    colDate: "의뢰일",
    colAction: "액션",
    btnReview: "검수하기",
    noCases: "접수된 컨설팅 의뢰가 없습니다."
  },
  auth: {
    title: "환영합니다",
    desc: "로그인하여 의뢰 내역과 컨설팅 결과물을 안전하게 관리하세요.",
    google: "Google 계정으로 계속하기",
    tos: "로그인 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다."
  },
  thinIntake: {
    back: "홈으로 돌아가기",
    title: "새로운 컨설팅 의뢰",
    desc: "컨설팅이 필요한 핵심 분야를 선택하고 현재 겪고 있는 문제를 자세히 적어주세요. AI가 비즈니스를 진단하고 맞춤형 전략 리포트를 생성합니다.",
    step1: "1. 컨설팅 분야 선택",
    step2: "2. 현재 진행 중인 비즈니스 고민을 자유롭게 적어주세요",
    placeholder: "예) 제품은 완벽하게 완성했는데, 타겟 고객에게 어떻게 포지셔닝해야 할지 막막합니다. 특히 경쟁사보다 우위에 있다는 것을 어필하고 싶어요.",
    timing: "전체 전략 리포트가 완성되기까지 약 15초 정도 소요됩니다.",
    analyzing: "진단 및 전략 분석 중...",
    generate: "전략 리포트 생성하기",
    types: {
      branding: { label: '브랜드 및 포지셔닝', desc: '독보적인 차별화 포인트 발굴' },
      marketing: { label: '마케팅 전략', desc: '고객 획득 및 매력적인 메시징' },
      sales: { label: '세일즈 및 커뮤니케이션', desc: '클라이언트 설득 및 범위 방어' },
      automation: { label: '비즈니스 자동화', desc: '운영 효율화 및 반복 업무 제거' }
    }
  },
  leadModal: {
    title: "무료 전문가 진단 신청",
    desc: "리포트를 열람하기 전에 연락처를 남겨주세요. 전문 컨설턴트가 직접 연락드립니다.",
    company: "회사명 또는 성함",
    companyPlaceholder: "예) 주식회사 커넥토 / 김지수",
    phone: "휴대폰 번호",
    phonePlaceholder: "예) 010-1234-5678",
    email: "이메일 주소",
    emailPlaceholder: "예) hello@connecto.ai",
    submit: "리포트 보기",
    submitting: "저장 중...",
  },
  thinReport: {
    title: "AI 컨설팅 리포트",
    focus: "포커스:",
    expertBtn: "실제 전문가 진단 받기 (무료)",
    requestReview: "PM 리뷰 요청하기",
    inputLabel: "고객 의뢰 내용",
    step1: "1. 진단 로딩 중...",
    step2: "2. 전략 로딩 중...",
    step3: "3. 액션플랜 준비 중...",
    step4: "4. 산출물 정리 중...",
    rootDiagnosis: "1. 핵심 문제 진단 (Root Cause)",
    probRef: "비즈니스 문제 재정의",
    rootCauses: "근본적 원인 분석",
    priority: "최우선 해결 과제",
    stratDir: "2. 구조화된 해결 전략",
    coreDir: "핵심 방향성",
    positioning: "포지셔닝 전략",
    scope: "프로젝트 제안 범위",
    actionPlan: "3. 구체적인 실행 액션 플랜",
    readyOutput: "4. 즉시 활용 가능한 산출물",
    execSummary: "전체 프로젝트 요약서 (Executive Summary)",
    marketingMsg: "고객 대상 마케팅 / 커뮤니케이션 메시지",
    notFound: "해당 의뢰 내용을 찾을 수 없습니다."
  },
  common: {
    loading: "로딩 중..."
  }
};
