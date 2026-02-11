import svgPaths from "./svg-v2nxww7shu";

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['JetBrains_Mono:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] relative shrink-0 text-[#111] text-[12px] tracking-[1.2px] uppercase w-[67.2px]">
        <p className="css-4hzbpn leading-[16px]">TalentOS</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <div className="bg-[#eb3a14] rounded-[9999px] shrink-0 size-[20px]" data-name="Background" />
        <Container />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[64px] relative shrink-0 w-[255px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-px px-[24px] relative size-full">
        <Container1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[0.61px] px-[8px] relative w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] tracking-[1.04px] uppercase w-[80.04px]">
          <p className="css-4hzbpn leading-[15.6px]">Acquisition</p>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_12.5%_12.5%_8.33%]" data-name="Group">
      <div className="absolute inset-[-3.95%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.375 15.375">
          <g id="Group">
            <path d={svgPaths.p30e11a80} id="Vector" stroke="var(--stroke-0, #111111)" strokeWidth="1.125" />
            <path d={svgPaths.p2c88fd00} id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeWidth="1.125" />
            <path d={svgPaths.p2d77ae00} id="Vector_3" stroke="var(--stroke-0, #111111)" strokeWidth="1.125" />
            <path d={svgPaths.p17f94080} id="Vector_4" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group />
    </div>
  );
}

function IconifyIcon() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] text-center w-[45.52px]">
        <p className="css-4hzbpn leading-[16px]">Pipeline</p>
      </div>
    </div>
  );
}

function ItemButton() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon />
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]" data-name="Group">
      <div className="absolute inset-[-3.75%_-3.95%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.3744 16.125">
          <g id="Group">
            <path d={svgPaths.p8816100} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p26236c00} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group1 />
    </div>
  );
}

function IconifyIcon1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[71.3px]">
        <p className="css-4hzbpn leading-[16px]">Applications</p>
      </div>
    </div>
  );
}

function ItemButton1() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon1 />
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[5.21%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.1252">
        <g id="Group">
          <path d={svgPaths.p1187f200} fill="var(--fill-0, #666666)" id="Vector" />
          <path d={svgPaths.p3f0e5fa0} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
        </g>
      </svg>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group2 />
    </div>
  );
}

function IconifyIcon2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[59.52px]">
        <p className="css-4hzbpn leading-[16px]">Interviews</p>
      </div>
    </div>
  );
}

function ItemButton2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon2 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[8.33%_8.33%_8.33%_16.67%]" data-name="Group">
      <div className="absolute inset-[-3.75%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6251 16.125">
          <g id="Group">
            <path d={svgPaths.p2932d1c0} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p362b7d80} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p31185400} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p3ab47c80} id="Vector_4" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group3 />
    </div>
  );
}

function IconifyIcon3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[67.53px]">
        <p className="css-4hzbpn leading-[16px]">Onboarding</p>
      </div>
    </div>
  );
}

function ItemButton3() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon3 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="List">
      <ItemButton />
      <ItemButton1 />
      <ItemButton2 />
      <ItemButton3 />
    </div>
  );
}

function Recruitment() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Recruitment">
      <Container2 />
      <List />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[0.61px] px-[8px] relative w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] tracking-[1.04px] uppercase w-[72.76px]">
          <p className="css-4hzbpn leading-[15.6px]">Management</p>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.125">
          <g id="Group">
            <path d="M12.5625 6.56251H8.81251" id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
            <path d={svgPaths.p7df8c00} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.pccbd900} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group4 />
    </div>
  );
}

function IconifyIcon4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[46.8px]">
        <p className="css-4hzbpn leading-[16px]">Projects</p>
      </div>
    </div>
  );
}

function ItemButton4() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon4 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[8.33%_8.34%_12.64%_12.42%]" data-name="Group">
      <div className="absolute inset-[-2.64%_-2.63%_-3.95%_-3.94%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.2006 15.1626">
          <g id="Group">
            <path d={svgPaths.p2e93e00} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p18454280} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
            <path d={svgPaths.p3a5337c0} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group5 />
    </div>
  );
}

function IconifyIcon5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg5 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[68.53px]">
        <p className="css-4hzbpn leading-[16px]">AI Matching</p>
      </div>
    </div>
  );
}

function ItemButton5() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon5 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[12.5%_8.33%_8.33%_8.33%]" data-name="Group">
      <div className="absolute inset-[-3.95%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 15.375">
          <g id="Group">
            <path d={svgPaths.p1d225b96} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p1f6bb9f0} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p19f815a0} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group6 />
    </div>
  );
}

function IconifyIcon6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[74.44px]">
        <p className="css-4hzbpn leading-[16px]">Assignments</p>
      </div>
    </div>
  );
}

function ItemButton6() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon6 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.125">
          <g id="Group">
            <path d={svgPaths.p39ac2520} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p17609c0} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group7 />
    </div>
  );
}

function IconifyIcon7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg7 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[66.8px]">
        <p className="css-4hzbpn leading-[16px]">Timesheets</p>
      </div>
    </div>
  );
}

function ItemButton7() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon7 />
          <Container11 />
        </div>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="List">
      <ItemButton4 />
      <ItemButton5 />
      <ItemButton6 />
      <ItemButton7 />
    </div>
  );
}

function Management() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Management">
      <Container7 />
      <List1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[0.61px] px-[8px] relative w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] tracking-[1.04px] uppercase w-[101.85px]">
          <p className="css-4hzbpn leading-[15.6px]">{`Data & Finance`}</p>
        </div>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 16.125">
          <g id="Group">
            <path d={svgPaths.p96506e0} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p2a783480} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group8 />
    </div>
  );
}

function IconifyIcon8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg8 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[53.23px]">
        <p className="css-4hzbpn leading-[16px]">Analytics</p>
      </div>
    </div>
  );
}

function ItemButton8() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon8 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[12.5%_8.33%_8.33%_8.33%]" data-name="Group">
      <div className="absolute inset-[-3.95%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.125 15.375">
          <g id="Group">
            <path d="M3.5625 5.81246H6.5625" id="Vector" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
            <path d={svgPaths.p1e932200} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.p3e20f400} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeWidth="1.125" />
            <path d={svgPaths.ped45c80} id="Vector_4" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.125" />
            <path d="M12.5558 8.81246H12.5633" id="Vector_5" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <Group9 />
    </div>
  );
}

function IconifyIcon9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg9 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[38.89px]">
        <p className="css-4hzbpn leading-[16px]">Payroll</p>
      </div>
    </div>
  );
}

function ItemButton9() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Item → Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon9 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="List">
      <ItemButton8 />
      <ItemButton9 />
    </div>
  );
}

function DataFinance() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Data & Finance">
      <Container12 />
      <List2 />
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[255px]" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[31px] items-start overflow-clip pb-[194.17px] pt-[23px] px-[16px] relative rounded-[inherit] size-full">
        <Recruitment />
        <Management />
        <DataFinance />
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p3f6cde60} fill="var(--fill-0, #666666)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg10 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] text-center w-[39.81px]">
        <p className="css-4hzbpn leading-[16px]">Theme</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[12px] py-[8px] relative w-full">
          <IconifyIcon10 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] w-[67.2px]">
        <p className="css-4hzbpn leading-[16px]">Kyriakos M.</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start mb-[-1px] pb-[0.61px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] w-[31.17px]">
        <p className="css-4hzbpn leading-[15.6px]">Admin</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[12px] relative w-full">
          <div className="relative rounded-[9999px] shrink-0 size-[32px]" data-name="Gradient+Border" style={{ backgroundImage: "linear-gradient(135deg, rgb(229, 231, 235) 0%, rgb(156, 163, 175) 100%)" }}>
            <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
          </div>
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-[255px]" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-[16px] pt-[17px] px-[16px] relative w-full">
        <Button />
        <Container19 />
      </div>
    </div>
  );
}

function AsideSidebar() {
  return (
    <div className="bg-white content-stretch flex flex-col h-full items-start justify-between pr-px relative shrink-0 w-[256px] z-[2]" data-name="Aside - Sidebar">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-r border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Nav />
      <HorizontalBorder1 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] tracking-[-0.3px] w-[49px]">
        <p className="css-4hzbpn leading-[16px]">TalentOS</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[4.33px]">
        <p className="css-4hzbpn leading-[16px]">/</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] tracking-[-0.35px] w-[130.98px]">
        <p className="css-4hzbpn leading-[20px]">Recruitment Pipeline</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container20 />
        <Container21 />
        <Container22 />
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333">
          <g id="Group">
            <path d={svgPaths.p3fc8a200} id="Vector" stroke="var(--stroke-0, #666666)" />
            <path d="M11.5 11.5L13.8333 13.8333" id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <Group10 />
    </div>
  );
}

function IconifyIcon11() {
  return (
    <div className="relative shrink-0" data-name="iconify-icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg11 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#666] text-[12px] w-[64.82px]">
        <p className="css-4hzbpn leading-[normal]">Search...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative shrink-0 w-[192px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Container24 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[5px] py-px relative rounded-[4px] self-stretch shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[3.61px]">
        <p className="css-4hzbpn leading-[15px]">/</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative">
        <BackgroundBorder />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex gap-[8px] items-center px-[13px] py-[7px] relative rounded-[4px] shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <IconifyIcon11 />
      <Input />
      <Container25 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3333 14.3333">
          <g id="Group">
            <path d={svgPaths.p1448ac80} id="Vector" stroke="var(--stroke-0, white)" />
            <path d={svgPaths.p18a33100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <Group11 />
    </div>
  );
}

function IconifyIcon12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg12 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[0.3px] w-[70.28px]">
        <p className="css-4hzbpn leading-[16px]">Create New</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#111] content-stretch flex gap-[8px] items-center px-[12px] py-[6px] relative rounded-[4px] shrink-0" data-name="Button">
      <IconifyIcon12 />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <OverlayBorder />
        <Button1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-[2px] bg-[rgba(255,255,255,0.5)] h-[64px] relative shrink-0 w-full z-[2]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.05)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-px px-[32px] relative size-full">
          <Container23 />
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.75 10.75">
          <g id="Group">
            <path d={svgPaths.p3c2a3980} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
            <path d={svgPaths.pbf6d380} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <Group12 />
    </div>
  );
}

function IconifyIcon13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg13 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <IconifyIcon13 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] w-[43.86px]">
        <p className="css-4hzbpn leading-[16px]">Applied</p>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] w-[6.23px]">
        <p className="css-4hzbpn leading-[15.6px]">8</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[12px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Overlay />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Container28 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-start justify-between leading-[0] relative text-[#666] text-[10px] w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] h-[15px] justify-center relative shrink-0 w-[36px]">
          <p className="css-4hzbpn leading-[15px]">DEV-01</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] h-[15px] justify-center not-italic relative shrink-0 w-[35.42px]">
          <p className="css-4hzbpn leading-[15px]">2m ago</p>
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[145.76px]">
        <p className="css-4hzbpn leading-[17.5px]">Alex Konstantopoulos</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[143.92px]">
        <p className="css-4hzbpn leading-[16px]">Senior Frontend Engineer</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading1 />
        <Container29 />
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[26.83px]">
        <p className="css-4hzbpn leading-[15px]">React</p>
      </div>
    </div>
  );
}

function OverlayBorder2() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[18.66px]">
        <p className="css-4hzbpn leading-[15px]">Vue</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="Container">
      <OverlayBorder1 />
      <OverlayBorder2 />
    </div>
  );
}

function Background() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(219, 234, 254) 0%, rgb(191, 219, 254) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#1e40af] text-[8px] text-center w-[11.17px]">
        <p className="css-4hzbpn leading-[12px]">AK</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container31 />
        <Background />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 1">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Paragraph />
        <Container30 />
        <Container32 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-start justify-between leading-[0] relative text-[#666] text-[10px] w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] h-[15px] justify-center relative shrink-0 w-[36px]">
          <p className="css-4hzbpn leading-[15px]">DES-04</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] h-[15px] justify-center not-italic relative shrink-0 w-[41.72px]">
          <p className="css-4hzbpn leading-[15px]">45m ago</p>
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[79.46px]">
        <p className="css-4hzbpn leading-[17.5px]">Sarah Miller</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[98.65px]">
        <p className="css-4hzbpn leading-[16px]">Product Designer</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading2 />
        <Container33 />
      </div>
    </div>
  );
}

function OverlayBorder3() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[28.84px]">
        <p className="css-4hzbpn leading-[15px]">Figma</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <OverlayBorder3 />
    </div>
  );
}

function Background1() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(243, 232, 255) 0%, rgb(233, 213, 255) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#6b21a8] text-[8px] text-center w-[12.47px]">
        <p className="css-4hzbpn leading-[12px]">SM</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container35 />
        <Background1 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 2">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Paragraph1 />
        <Container34 />
        <Container36 />
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-start justify-between leading-[0] relative text-[#666] text-[10px] w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] h-[15px] justify-center relative shrink-0 w-[36px]">
          <p className="css-4hzbpn leading-[15px]">ENG-09</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] h-[15px] justify-center not-italic relative shrink-0 w-[32.66px]">
          <p className="css-4hzbpn leading-[15px]">3h ago</p>
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[72.31px]">
        <p className="css-4hzbpn leading-[17.5px]">James Lee</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[110.48px]">
        <p className="css-4hzbpn leading-[16px]">Backend Developer</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading3 />
        <Container37 />
      </div>
    </div>
  );
}

function OverlayBorder4() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[25.48px]">
        <p className="css-4hzbpn leading-[15px]">Node</p>
      </div>
    </div>
  );
}

function OverlayBorder5() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[22.61px]">
        <p className="css-4hzbpn leading-[15px]">AWS</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="Container">
      <OverlayBorder4 />
      <OverlayBorder5 />
    </div>
  );
}

function Background2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(220, 252, 231) 0%, rgb(187, 247, 208) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#166534] text-[8px] text-center w-[9.13px]">
        <p className="css-4hzbpn leading-[12px]">JL</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container39 />
        <Background2 />
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 3">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Paragraph2 />
        <Container38 />
        <Container40 />
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-[40px] pr-[8px] relative size-full">
          <Card />
          <Card1 />
          <Card2 />
        </div>
      </div>
    </div>
  );
}

function Column1Applied() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col isolate items-start left-[32px] top-[32px] w-[320px]" data-name="Column 1: Applied">
      <Margin />
      <Container41 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[8.33%_12.5%_8.34%_12.5%]" data-name="Group">
      <div className="absolute inset-[-3.75%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.75 10.749">
          <g id="Group">
            <path d={svgPaths.p32949380} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
            <path d={svgPaths.pd3cc000} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            <path d={svgPaths.p1666d100} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg14() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <Group13 />
    </div>
  );
}

function IconifyIcon14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg14 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <IconifyIcon14 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] w-[58.09px]">
        <p className="css-4hzbpn leading-[16px]">Screening</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] w-[6.23px]">
        <p className="css-4hzbpn leading-[15.6px]">4</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[12px] relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Overlay1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Container42 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#fff7ed] content-stretch flex gap-[4px] items-center px-[6px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="bg-[#f97316] rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#ea580c] text-[10px] w-[33.81px]">
        <p className="css-4hzbpn leading-[15px]">Review</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10px] w-[36px]">
          <p className="css-4hzbpn leading-[15px]">OPS-02</p>
        </div>
        <Background3 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[68.2px]">
        <p className="css-4hzbpn leading-[17.5px]">Mike Ross</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[98.59px]">
        <p className="css-4hzbpn leading-[16px]">DevOps Engineer</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading5 />
        <Container44 />
      </div>
    </div>
  );
}

function OverlayBorder6() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[33.8px]">
        <p className="css-4hzbpn leading-[15px]">Docker</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <OverlayBorder6 />
    </div>
  );
}

function Background4() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(243, 244, 246) 0%, rgb(229, 231, 235) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#1f2937] text-[8px] text-center w-[12.48px]">
        <p className="css-4hzbpn leading-[12px]">MR</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container46 />
        <Background4 />
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 1">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Container43 />
        <Container45 />
        <Container47 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-start justify-between leading-[0] relative text-[#666] text-[10px] w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] h-[15px] justify-center relative shrink-0 w-[36px]">
          <p className="css-4hzbpn leading-[15px]">MKT-01</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] h-[15px] justify-center not-italic relative shrink-0 w-[30.75px]">
          <p className="css-4hzbpn leading-[15px]">1d ago</p>
        </div>
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[81.7px]">
        <p className="css-4hzbpn leading-[17.5px]">Elena Fisher</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[95.4px]">
        <p className="css-4hzbpn leading-[16px]">Growth Marketer</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading6 />
        <Container48 />
      </div>
    </div>
  );
}

function OverlayBorder7() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[20.08px]">
        <p className="css-4hzbpn leading-[15px]">SEO</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <OverlayBorder7 />
    </div>
  );
}

function Background5() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(252, 231, 243) 0%, rgb(251, 207, 232) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#9d174d] text-[8px] text-center w-[9.55px]">
        <p className="css-4hzbpn leading-[12px]">EF</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container50 />
        <Background5 />
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 2">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Paragraph3 />
        <Container49 />
        <Container51 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-[40px] pr-[8px] relative size-full">
          <Card3 />
          <Card4 />
        </div>
      </div>
    </div>
  );
}

function Column2Screening() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col isolate items-start left-[384px] top-[32px] w-[320px]" data-name="Column 2: Screening">
      <Margin1 />
      <Container52 />
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.75 10.75">
          <g id="Group">
            <path d={svgPaths.pa9f4e00} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
            <path d={svgPaths.p3c9ee680} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <Group14 />
    </div>
  );
}

function IconifyIcon15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg15 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <IconifyIcon15 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] w-[53.06px]">
        <p className="css-4hzbpn leading-[16px]">Interview</p>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] w-[6.23px]">
        <p className="css-4hzbpn leading-[15.6px]">2</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[12px] relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Overlay2 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Container53 />
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute inset-[10.42%_8.33%_8.33%_8.33%]" data-name="Group">
      <div className="absolute inset-[-3.85%_-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.95833 8.75">
          <g id="Group">
            <path d={svgPaths.p9fd3180} id="Vector" stroke="var(--stroke-0, #2563EB)" strokeWidth="0.625" />
            <path d={svgPaths.p227b2880} id="Vector_2" stroke="var(--stroke-0, #2563EB)" strokeLinecap="round" strokeWidth="0.625" />
            <path d={svgPaths.p19fa5e20} fill="var(--fill-0, #2563EB)" id="Vector_3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="SVG">
      <Group15 />
    </div>
  );
}

function IconifyIcon16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg16 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex gap-[4px] items-center px-[6px] relative rounded-[4px] shrink-0" data-name="Background">
      <IconifyIcon16 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[10px] w-[47.95px]">
        <p className="css-4hzbpn leading-[15px]">Tomorrow</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="relative shrink-0 w-[277px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10px] w-[30px]">
          <p className="css-4hzbpn leading-[15px]">PM-05</p>
        </div>
        <Background6 />
      </div>
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[78.71px]">
        <p className="css-4hzbpn leading-[17.5px]">Emily Wong</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[98.07px]">
        <p className="css-4hzbpn leading-[16px]">Product Manager</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="relative shrink-0 w-[277px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading8 />
        <Container55 />
      </div>
    </div>
  );
}

function OverlayBorder8() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[24.06px]">
        <p className="css-4hzbpn leading-[15px]">SaaS</p>
      </div>
    </div>
  );
}

function OverlayBorder9() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[23.72px]">
        <p className="css-4hzbpn leading-[15px]">Agile</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="Container">
      <OverlayBorder8 />
      <OverlayBorder9 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="content-stretch flex items-center justify-center p-px relative rounded-[9999px] shrink-0 size-[20px] z-[2]" data-name="Background+Border" style={{ backgroundImage: "linear-gradient(45deg, rgb(254, 249, 195) 0%, rgb(254, 240, 138) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#854d0e] text-[8px] text-center w-[12.86px]">
        <p className="css-4hzbpn leading-[12px]">EW</p>
      </div>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute inset-[8.33%_16.67%]" data-name="Group">
      <div className="absolute inset-[-3.75%_-4.69%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75013 10.75">
          <g id="Group">
            <path d={svgPaths.p2ef25bc0} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
            <path d={svgPaths.p2a20d280} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <Group16 />
    </div>
  );
}

function IconifyIcon17() {
  return (
    <div className="relative shrink-0" data-name="iconify-icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg17 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex items-center justify-center left-[-6px] p-px rounded-[9999px] size-[20px] top-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[9999px]" />
      <IconifyIcon17 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[14px] z-[1]" data-name="Margin">
      <BackgroundBorder2 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex isolate items-start relative shrink-0" data-name="Container">
      <BackgroundBorder1 />
      <Margin3 />
    </div>
  );
}

function Container59() {
  return (
    <div className="relative shrink-0 w-[277px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container57 />
        <Container58 />
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 1">
      <div aria-hidden="true" className="absolute border-[#eb3a14] border-b border-l-2 border-r border-solid border-t inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pl-[18px] pr-[17px] py-[17px] relative w-full">
        <Container54 />
        <Container56 />
        <Container59 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-start justify-between leading-[0] relative text-[#666] text-[10px] w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] h-[15px] justify-center relative shrink-0 w-[36px]">
          <p className="css-4hzbpn leading-[15px]">ENG-12</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] h-[15px] justify-center not-italic relative shrink-0 w-[32.78px]">
          <p className="css-4hzbpn leading-[15px]">2d ago</p>
        </div>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[68.03px]">
        <p className="css-4hzbpn leading-[17.5px]">Tom Chen</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[108.39px]">
        <p className="css-4hzbpn leading-[16px]">Full Stack Engineer</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading9 />
        <Container60 />
      </div>
    </div>
  );
}

function OverlayBorder10() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[33.25px]">
        <p className="css-4hzbpn leading-[15px]">Python</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <OverlayBorder10 />
    </div>
  );
}

function Background7() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(204, 251, 241) 0%, rgb(153, 246, 228) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#115e59] text-[8px] text-center w-[10.86px]">
        <p className="css-4hzbpn leading-[12px]">TC</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container62 />
        <Background7 />
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Card 2">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Paragraph4 />
        <Container61 />
        <Container63 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-[40px] pr-[8px] relative size-full">
          <Card5 />
          <Card6 />
        </div>
      </div>
    </div>
  );
}

function Column3Interview() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col isolate items-start left-[736px] top-[32px] w-[320px]" data-name="Column 3: Interview">
      <Margin2 />
      <Container64 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute inset-[5.21%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.75 10.75">
        <g id="Group">
          <path d={svgPaths.p2ac90f80} fill="var(--fill-0, #666666)" id="Vector" />
          <path d={svgPaths.p1d4eae80} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
          <path d={svgPaths.p21f7d070} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function Svg18() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <Group17 />
    </div>
  );
}

function IconifyIcon18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg18 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <IconifyIcon18 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] w-[29.2px]">
        <p className="css-4hzbpn leading-[16px]">Offer</p>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] w-[6.23px]">
        <p className="css-4hzbpn leading-[15.6px]">1</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[12px] relative shrink-0 w-full" data-name="Container">
      <Heading10 />
      <Overlay3 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Container65 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex gap-[4px] items-center px-[6px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="bg-[#22c55e] rounded-[9999px] shrink-0 size-[4px]" data-name="Background" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[10px] w-[54.55px]">
        <p className="css-4hzbpn leading-[15px]">Negotiating</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between relative w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10px] w-[36px]">
          <p className="css-4hzbpn leading-[15px]">DEV-05</p>
        </div>
        <Background8 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[72.29px]">
        <p className="css-4hzbpn leading-[17.5px]">David Cole</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[88.99px]">
        <p className="css-4hzbpn leading-[16px]">Senior Backend</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading11 />
        <Container67 />
      </div>
    </div>
  );
}

function OverlayBorder11() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[13.47px]">
        <p className="css-4hzbpn leading-[15px]">Go</p>
      </div>
    </div>
  );
}

function OverlayBorder12() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.05)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[18.19px]">
        <p className="css-4hzbpn leading-[15px]">K8s</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="Container">
      <OverlayBorder11 />
      <OverlayBorder12 />
    </div>
  );
}

function Background9() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background" style={{ backgroundImage: "linear-gradient(45deg, rgb(224, 231, 255) 0%, rgb(199, 210, 254) 100%)" }}>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#3730a3] text-[8px] text-center w-[11.64px]">
        <p className="css-4hzbpn leading-[12px]">DC</p>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container69 />
        <Background9 />
      </div>
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
          <Container66 />
          <Container68 />
          <Container70 />
          <div className="absolute bg-gradient-to-r from-[#4ade80] h-[2px] left-px right-px to-[#10b981] top-px" data-name="Horizontal Divider" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(34,197,94,0.3)] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function Container71() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[40px] pr-[8px] relative size-full">
          <BackgroundBorderShadow />
        </div>
      </div>
    </div>
  );
}

function Column4Offer() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col isolate items-start left-[1088px] top-[32px] w-[320px]" data-name="Column 4: Offer">
      <Margin4 />
      <Container71 />
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute inset-[8.33%_8.33%_8.33%_16.67%]" data-name="Group">
      <div className="absolute inset-[-3.75%_-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.75007 10.75">
          <g id="Group">
            <path d={svgPaths.p2ef25bc0} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
            <path d={svgPaths.p24f95a00} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
            <path d={svgPaths.p1fd4f680} id="Vector_3" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            <path d={svgPaths.p194cca80} id="Vector_4" stroke="var(--stroke-0, #666666)" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <Group18 />
    </div>
  );
}

function IconifyIcon19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="iconify-icon">
      <Svg19 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Heading 3">
      <IconifyIcon19 />
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[12px] w-[30.84px]">
        <p className="css-4hzbpn leading-[16px]">Hired</p>
      </div>
    </div>
  );
}

function Overlay4() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] content-stretch flex flex-col items-start px-[6px] py-[2px] relative rounded-[4px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] relative shrink-0 text-[#666] text-[10.4px] w-[12.47px]">
        <p className="css-4hzbpn leading-[15.6px]">12</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex items-center justify-between pb-[12px] relative shrink-0 w-full" data-name="Container">
      <Heading12 />
      <Overlay4 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full z-[2]" data-name="Margin">
      <Container72 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-start justify-between leading-[0] relative text-[#666] text-[10px] w-full">
        <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] h-[15px] justify-center relative shrink-0 w-[30px]">
          <p className="css-4hzbpn leading-[15px]">HR-03</p>
        </div>
        <div className="flex flex-col font-['Inter:Regular',sans-serif] h-[15px] justify-center not-italic relative shrink-0 w-[32.81px]">
          <p className="css-4hzbpn leading-[15px]">1w ago</p>
        </div>
      </div>
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#111] text-[14px] w-[78.51px]">
        <p className="css-4hzbpn leading-[17.5px]">Linda Baker</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[12px] w-[74.65px]">
        <p className="css-4hzbpn leading-[16px]">HR Specialist</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start relative w-full">
        <Heading13 />
        <Container73 />
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex flex-col items-start px-[7px] py-[3px] relative rounded-[4px] self-stretch shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#666] text-[10px] w-[32.55px]">
        <p className="css-4hzbpn leading-[15px]">People</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Container">
      <Border />
    </div>
  );
}

function Background10() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[20px]" data-name="Background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[9999px]">
        <div className="absolute bg-[#e5e7eb] inset-0 rounded-[9999px]" />
        <div className="absolute bg-white inset-0 mix-blend-saturation rounded-[9999px]" />
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#4b5563] text-[8px] text-center w-[9.78px]">
        <p className="css-4hzbpn leading-[12px]">LB</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="relative shrink-0 w-[278px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pt-[4px] relative w-full">
        <Container75 />
        <Background10 />
      </div>
    </div>
  );
}

function OverlayBorder13() {
  return (
    <div className="bg-[rgba(0,0,0,0.05)] relative rounded-[4px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[17px] relative w-full">
        <Paragraph5 />
        <Container74 />
        <Container76 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[1]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pb-[40px] pr-[8px] relative size-full">
          <OverlayBorder13 />
        </div>
      </div>
    </div>
  );
}

function Column5Hired() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col isolate items-start left-[1440px] top-[32px] w-[320px]" data-name="Column 5: Hired">
      <Margin5 />
      <Container77 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-3.75%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9167 17.9167">
          <g id="Group">
            <path d={svgPaths.pc9ca700} id="Vector" stroke="var(--stroke-0, #666666)" strokeWidth="1.25" />
            <path d={svgPaths.p12830f00} id="Vector_2" stroke="var(--stroke-0, #666666)" strokeLinecap="round" strokeWidth="1.25" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <Group19 />
    </div>
  );
}

function IconifyIcon20() {
  return (
    <div className="relative shrink-0" data-name="iconify-icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Svg20 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start justify-center min-h-px min-w-px pb-px pt-[17px] px-px relative rounded-[8px] w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-dashed inset-0 pointer-events-none rounded-[8px]" />
      <IconifyIcon20 />
    </div>
  );
}

function AddColumnButton() {
  return (
    <div className="absolute bottom-[32px] content-stretch flex flex-col items-start justify-center left-[1792px] pt-[32px] top-[32px] w-[48px]" data-name="Add Column Button">
      <Button2 />
    </div>
  );
}

function DynamicContentArea1PipelineViewRevisedComprehensiveKanban() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px overflow-clip relative w-full z-[1]" data-name="Dynamic Content Area → 1. PIPELINE VIEW (REVISED: Comprehensive Kanban">
      <Column1Applied />
      <Column2Screening />
      <Column3Interview />
      <Column4Offer />
      <Column5Hired />
      <AddColumnButton />
    </div>
  );
}

function MainContent() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex flex-[1_0_0] flex-col h-full isolate items-start min-h-px min-w-px overflow-clip relative z-[1]" data-name="Main Content">
      <Header />
      <DynamicContentArea1PipelineViewRevisedComprehensiveKanban />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex isolate items-start relative size-full" data-name="Body">
      <AsideSidebar />
      <MainContent />
    </div>
  );
}