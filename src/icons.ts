export interface Icons {
	[key: string]: string
}

const icons: Icons = {
	category: `<svg width="16" height="16" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M12.0028 14.62C13.2361 14.62 14.24 15.6154 14.24 16.8389V19.9857C14.24 20.2486 14.4511 20.4594 14.7215 20.4655H16.674C18.2126 20.4655 19.4634 19.2317 19.4634 17.7157V8.79095C19.4562 8.26921 19.2073 7.77817 18.7801 7.45183L12.0263 2.07287C11.1198 1.35574 9.85156 1.35574 8.9419 2.07491L2.23419 7.44979C1.79063 7.78635 1.54171 8.2774 1.53659 8.80834V17.7157C1.53659 19.2317 2.78737 20.4655 4.326 20.4655H6.29693C6.57454 20.4655 6.7999 20.2455 6.7999 19.9755C6.7999 19.9161 6.80707 19.8568 6.81937 19.8005V16.8389C6.81937 15.6226 7.81712 14.6282 9.04127 14.62H12.0028ZM16.674 22H14.7031C13.5742 21.9734 12.7035 21.0885 12.7035 19.9857V16.8389C12.7035 16.4614 12.389 16.1545 12.0028 16.1545H9.04639C8.66839 16.1566 8.35595 16.4645 8.35595 16.8389V19.9755C8.35595 20.0522 8.34571 20.1259 8.32419 20.1954C8.21356 21.2082 7.34693 22 6.29693 22H4.326C1.94019 22 0 20.0778 0 17.7157V8.80118C0.0102439 7.78431 0.479415 6.85337 1.28971 6.24059L7.9841 0.874926C9.45819 -0.291301 11.5121 -0.291301 12.9831 0.87288L19.7257 6.24366C20.5175 6.84621 20.9867 7.7751 21 8.77969V17.7157C21 20.0778 19.0598 22 16.674 22Z" fill="currentColor"/>
	</svg>
	`,
	logout: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M12.6915 2C10.2455 2 8.25551 3.99 8.25551 6.436V7.368C8.25551 7.782 8.59151 8.118 9.00551 8.118C9.41951 8.118 9.75551 7.782 9.75551 7.368V6.436C9.75551 4.816 11.0725 3.5 12.6915 3.5H17.5665C19.1835 3.5 20.4995 4.816 20.4995 6.436V17.565C20.4995 19.184 19.1835 20.5 17.5665 20.5H12.6805C11.0685 20.5 9.75551 19.188 9.75551 17.576V16.633C9.75551 16.219 9.41951 15.883 9.00551 15.883C8.59151 15.883 8.25551 16.219 8.25551 16.633V17.576C8.25551 20.016 10.2415 22 12.6805 22H17.5665C20.0105 22 21.9995 20.011 21.9995 17.565V6.436C21.9995 3.99 20.0105 2 17.5665 2H12.6915ZM4.61141 8.554L1.68341 11.469C1.65729 11.4949 1.6339 11.5219 1.61249 11.5504L1.68341 11.469C1.64798 11.5039 1.61647 11.5421 1.58913 11.5828C1.5771 11.6012 1.56549 11.6203 1.55474 11.6399C1.54601 11.6552 1.53798 11.6712 1.53053 11.6875C1.52422 11.7018 1.51816 11.7162 1.51254 11.7308C1.505 11.7498 1.4984 11.7693 1.49261 11.7891C1.48825 11.8047 1.48423 11.8203 1.48072 11.836C1.47625 11.8551 1.47273 11.8743 1.46997 11.8937C1.4684 11.9063 1.46687 11.9195 1.46569 11.9328C1.4634 11.9556 1.46241 11.9777 1.46241 12L1.46751 12.062L1.46956 12.1017C1.46979 12.1034 1.47003 12.1051 1.47027 12.1068L1.46241 12C1.46241 12.0555 1.46856 12.1105 1.4805 12.1639C1.48423 12.1797 1.48825 12.1953 1.49273 12.2107C1.4984 12.2307 1.505 12.2502 1.5124 12.2695C1.51816 12.2838 1.52422 12.2982 1.5307 12.3123C1.53798 12.3288 1.54601 12.3448 1.55462 12.3605C1.56549 12.3797 1.5771 12.3988 1.58951 12.4172C1.59653 12.4282 1.60423 12.439 1.61223 12.4497C1.63604 12.481 1.66198 12.5104 1.69005 12.5377L4.61141 15.447C4.75741 15.593 4.94941 15.666 5.14041 15.666C5.33241 15.666 5.52541 15.593 5.67141 15.445C5.96341 15.151 5.96241 14.677 5.66941 14.385L4.02951 12.75H14.2537C14.6677 12.75 15.0037 12.414 15.0037 12C15.0037 11.586 14.6677 11.25 14.2537 11.25H4.02751L5.66941 9.616C5.96241 9.324 5.96441 8.85 5.67141 8.556C5.37941 8.262 4.90541 8.262 4.61141 8.554Z" fill="currentColor"/>
	</svg>
	`,
	send: `<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path fill-rule="evenodd" clip-rule="evenodd" d="M9.54253 12.3483L12.59 17.2925C12.7234 17.5091 12.9317 17.5066 13.0159 17.495C13.1 17.4833 13.3025 17.4316 13.3759 17.1858L17.1867 4.31497C17.2534 4.08747 17.1309 3.93247 17.0759 3.87747C17.0225 3.82247 16.87 3.70497 16.6492 3.76747L3.7692 7.53914C3.52503 7.61081 3.4717 7.81581 3.46003 7.89997C3.44837 7.98581 3.44503 8.19831 3.66087 8.33414L8.6617 11.4616L13.08 6.99664C13.3225 6.75164 13.7184 6.74914 13.9642 6.99164C14.21 7.23414 14.2117 7.63081 13.9692 7.87581L9.54253 12.3483ZM12.9509 18.75C12.3709 18.75 11.8392 18.455 11.5259 17.9483L8.29503 12.7058L2.99837 9.39331C2.42753 9.03581 2.1292 8.39914 2.2217 7.72997C2.31337 7.06081 2.77253 6.52914 3.41753 6.33997L16.2975 2.56831C16.89 2.39497 17.525 2.55914 17.9617 2.99414C18.3984 3.43331 18.5609 4.07497 18.3842 4.66997L14.5734 17.54C14.3825 18.1875 13.8492 18.645 13.1817 18.7341C13.1034 18.7441 13.0275 18.75 12.9509 18.75Z" fill="white"/>
	</svg>
	`,
	edit: `<?xml version="1.0" ?><svg class="feather feather-edit" fill="none" height="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
	chevronUpDown: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" 
	width="21" height="20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd"></path></svg>`,
	tick: `<?xml version="1.0" ?><svg height="15px" version="1.1" viewBox="0 0 18 15" width="18px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="currentColor" id="Core" transform="translate(-423.000000, -47.000000)"><g id="check" transform="translate(423.000000, 47.500000)"><path d="M6,10.2 L1.8,6 L0.4,7.4 L6,13 L18,1 L16.6,-0.4 L6,10.2 Z" id="Shape"/></g></g></g></svg>`,
	crash: `<svg height="20" width="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330" xml:space="preserve">
	<path d="M240 121.076H30V275c0 8.284 6.716 15 15 15h97.596c19.246 24.348 49.031 40 82.404 40 57.897 0 105-47.103 105-105 0-52.805-39.184-96.623-90-103.924zM225 300c-41.355 0-75-33.645-75-75s33.645-75 75-75 75 33.645 75 75-33.645 75-75 75zM240 90h15c8.284 0 15-6.716 15-15s-6.716-15-15-15h-45V15c0-8.284-6.716-15-15-15H75c-8.284 0-15 6.716-15 15v45H15C6.716 60 0 66.716 0 75s6.716 15 15 15h225zM90 30h90v30H90V30z"/>
	<path d="M256.819 193.181c-5.857-5.858-15.355-5.858-21.213 0L225 203.787l-10.606-10.606c-5.857-5.858-15.355-5.858-21.213 0-5.858 5.858-5.858 15.355 0 21.213L203.787 225l-10.606 10.606c-5.858 5.858-5.858 15.355 0 21.213a14.954 14.954 0 0 0 10.606 4.394c3.839 0 7.678-1.465 10.607-4.394L225 246.213l10.606 10.606a14.954 14.954 0 0 0 10.607 4.394 14.95 14.95 0 0 0 10.606-4.394c5.858-5.858 5.858-15.355 0-21.213L246.213 225l10.606-10.606c5.859-5.859 5.859-15.355 0-21.213z"/>
	</svg>
	`,
	plus: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_332_4551)"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="currentColor"></path></g><defs><clipPath id="clip0_332_4551"><rect width="24" height="24" fill="currentColor"></rect></clipPath></defs></svg>`
}

export default icons
