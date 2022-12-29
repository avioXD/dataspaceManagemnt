import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AuthService from "../services/_auth";

import CommonApiService from "../services/_common_api";
import { toast } from "react-toastify";
const regex: any = {
  contact_no: /(7|8|9)\d{9}/,
  aadhar_no: /^\d{4}\s\d{4}\s\d{4}$/,
  pan_no: /([A-Z]){5}([0-9]){4}([A-Z]){1}$/,
  name: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export default function Register() {
  const initCourses: any[] = [];
  const initial: any = {
    name: "",
    email: "",
    contact_no: "",
    number_prefix: "",
    password: "",
    course_id: "",
    course_mode: "",
    stream_type: "",
    user_type: "",
    student_college: "",
    state: "",
    stream: "",
    aadhar_no: "",
    payslip: "",
    company_name: "",
    work_experience_year: "",
    tc: false,
    agreement: false,
  };
  // register student
  const [courses, setCourses] = useState(initCourses);
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [screen, setScreen] = useState(1);
  const { getAllCourses } = CommonApiService();

  const [register, setRegister] = useState(initial);
  const { signUp } = AuthService();

  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    const res: any = await getAllCourses();
    setCourses(res);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onBackPress = () => {
    if (screen > 0 && screen < 5) {
      setScreen(screen - 1);
      checkForm();
    } else {
      setScreen(1);
    }
  };
  const onBlur = (val: object) => {
    if (regex[Object.keys(val)[0]]) {
      let ele: any = document.getElementById(
        `${[Object.keys(val)[0]]}`
      ) as HTMLDivElement | null;
      console.log("Valid Check");
      const key = Object.keys(val)[0];
      if (!register[key].match(regex[key])) {
        ele.classList.add("invalid");
        console.log("Invalid");
        setBtnDisabled(true);
        setFormError(true);
      } else {
        ele.classList.remove("invalid");
        setFormError(false);
        console.log("valid");
      }
    }
  };

  const onValueChange = (val: any) => {
    // console.log(val);
    setRegister({ ...register, ...val });
    console.log(val);

    let ele: any = document.getElementById(
      `${[Object.keys(val)[0]]}`
    ) as HTMLDivElement | null;
    if (ele) {
      ele.classList.remove("invalid");
      setFormError(false);
      console.log("valid");
    }

    // console.log(register);
  };
  const onNextPage = () => {
    console.log(register);
    if (screen == 1) {
      if (register.tc && !register.agreement && !formError) {
        setShow(true);
      } else if (register.tc && register.agreement && !formError) {
        setScreen(screen + 1);
        setBtnDisabled(true);
      }
    } else if (screen > 1 && screen < 3) {
      setScreen(screen + 1);
      setBtnDisabled(true);
    } else if (screen == 4) {
      registerUser();
    }
  };
  const registerUser = async () => {
    if (!formError) {
      const res: any = await signUp(register);
      if (res.status) {
        toast.success("Registration Successful!");
        resetPanel();
      }
    }
  };

  const resetPanel = () => {
    setRegister(initial);
    setScreen(1);
    setFormError(false);
    setBtnDisabled(true);
  };
  const checkForm = () => {
    setBtnDisabled(true);
    switch (screen) {
      case 1:
        if (
          !register?.name ||
          !register?.email ||
          !register?.contact_no ||
          !register?.password
        ) {
          setBtnDisabled(true);
        } else {
          setBtnDisabled(false);
        }
        break;
      case 2:
        if (!register.user_type) {
          setBtnDisabled(true);
        } else {
          setBtnDisabled(false);
        }
        break;
      case 3:
        if (!register.state) {
          setBtnDisabled(true);
        } else {
          setBtnDisabled(false);
        }
        break;
      // case 4:
      //   if (!register.course_id || !register.course_mode) {
      //     setBtnDisabled(true);
      //   } else {
      //     setBtnDisabled(false);
      //   }
      //   break;
      default:
        break;
    }
  };
  useEffect(() => {
    checkForm();
  }, [register]);
  return (
    <>
      <div className="row  register-background">
        <div className="col-sm-7 register-text  p-5">
          <div className="text ">
            <h1 className="title-primary">REGISTER NOW!</h1>
            <h4 className="subtitle-primary">
              Get 100+ courses in developing a future-proof career in solid and
              impactful manpower in the security and Information Systems as per
              international trend.
            </h4>
          </div>
        </div>
        <div className="col-sm-5 flex-center bg-white p-3">
          <div className="my-auto form register-form">
            <div className="slides ">
              <div className="flex-start header mb-5">
                <div className="logo mx-auto ">
                  <img src="/assets/svg/Logo.svg" alt="LOGO" />
                </div>
              </div>

              <div className="slide1 mt-3" id="slide1">
                {
                  {
                    1: (
                      <form id="form-1">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Name
                          </label>
                          <input
                            type="name"
                            className="form-control"
                            name="name"
                            id="name"
                            value={register.name}
                            aria-describedby="namelHelp"
                            placeholder="John Doe"
                            onBlur={(e) =>
                              onBlur({ [e.target.name]: e.target.value })
                            }
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email address
                          </label>
                          <input
                            type="email"
                            pattern-check="true"
                            className="form-control"
                            name="email"
                            id="email"
                            value={register.email}
                            aria-describedby="emailHelp"
                            placeholder="example@abc.com"
                            onBlur={(e) =>
                              onBlur({ [e.target.name]: e.target.value })
                            }
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">
                            Phone Number
                          </label>
                          <div className="d-flex">
                            <select
                              id="number_prefix"
                              name="number_prefix"
                              className="form-select "
                              defaultValue={register.number_prefix || "+91"}
                              onChange={(e) =>
                                onValueChange({
                                  [e.target.name]: e.target.value,
                                })
                              }
                              style={{ width: "9rem" }}
                            >
                              <option value={0} disabled selected hidden>
                                YY
                              </option>
                              <option data-countryCode="DZ" value="213">
                                Algeria (+213)
                              </option>
                              <option data-countryCode="AD" value="376">
                                Andorra (+376)
                              </option>
                              <option data-countryCode="AO" value="244">
                                Angola (+244)
                              </option>
                              <option data-countryCode="AI" value="1264">
                                Anguilla (+1264)
                              </option>
                              <option data-countryCode="AG" value="1268">
                                Antigua &amp; Barbuda (+1268)
                              </option>
                              <option data-countryCode="AR" value="54">
                                Argentina (+54)
                              </option>
                              <option data-countryCode="AM" value="374">
                                Armenia (+374)
                              </option>
                              <option data-countryCode="AW" value="297">
                                Aruba (+297)
                              </option>
                              <option data-countryCode="AU" value="61">
                                Australia (+61)
                              </option>
                              <option data-countryCode="AT" value="43">
                                Austria (+43)
                              </option>
                              <option data-countryCode="AZ" value="994">
                                Azerbaijan (+994)
                              </option>
                              <option data-countryCode="BS" value="1242">
                                Bahamas (+1242)
                              </option>
                              <option data-countryCode="BH" value="973">
                                Bahrain (+973)
                              </option>
                              <option data-countryCode="BD" value="880">
                                Bangladesh (+880)
                              </option>
                              <option data-countryCode="BB" value="1246">
                                Barbados (+1246)
                              </option>
                              <option data-countryCode="BY" value="375">
                                Belarus (+375)
                              </option>
                              <option data-countryCode="BE" value="32">
                                Belgium (+32)
                              </option>
                              <option data-countryCode="BZ" value="501">
                                Belize (+501)
                              </option>
                              <option data-countryCode="BJ" value="229">
                                Benin (+229)
                              </option>
                              <option data-countryCode="BM" value="1441">
                                Bermuda (+1441)
                              </option>
                              <option data-countryCode="BT" value="975">
                                Bhutan (+975)
                              </option>
                              <option data-countryCode="BO" value="591">
                                Bolivia (+591)
                              </option>
                              <option data-countryCode="BA" value="387">
                                Bosnia Herzegovina (+387)
                              </option>
                              <option data-countryCode="BW" value="267">
                                Botswana (+267)
                              </option>
                              <option data-countryCode="BR" value="55">
                                Brazil (+55)
                              </option>
                              <option data-countryCode="BN" value="673">
                                Brunei (+673)
                              </option>
                              <option data-countryCode="BG" value="359">
                                Bulgaria (+359)
                              </option>
                              <option data-countryCode="BF" value="226">
                                Burkina Faso (+226)
                              </option>
                              <option data-countryCode="BI" value="257">
                                Burundi (+257)
                              </option>
                              <option data-countryCode="KH" value="855">
                                Cambodia (+855)
                              </option>
                              <option data-countryCode="CM" value="237">
                                Cameroon (+237)
                              </option>
                              <option data-countryCode="CA" value="1">
                                Canada (+1)
                              </option>
                              <option data-countryCode="CV" value="238">
                                Cape Verde Islands (+238)
                              </option>
                              <option data-countryCode="KY" value="1345">
                                Cayman Islands (+1345)
                              </option>
                              <option data-countryCode="CF" value="236">
                                Central African Republic (+236)
                              </option>
                              <option data-countryCode="CL" value="56">
                                Chile (+56)
                              </option>
                              <option data-countryCode="CN" value="86">
                                China (+86)
                              </option>
                              <option data-countryCode="CO" value="57">
                                Colombia (+57)
                              </option>
                              <option data-countryCode="KM" value="269">
                                Comoros (+269)
                              </option>
                              <option data-countryCode="CG" value="242">
                                Congo (+242)
                              </option>
                              <option data-countryCode="CK" value="682">
                                Cook Islands (+682)
                              </option>
                              <option data-countryCode="CR" value="506">
                                Costa Rica (+506)
                              </option>
                              <option data-countryCode="HR" value="385">
                                Croatia (+385)
                              </option>
                              <option data-countryCode="CU" value="53">
                                Cuba (+53)
                              </option>
                              <option data-countryCode="CY" value="90392">
                                Cyprus North (+90392)
                              </option>
                              <option data-countryCode="CY" value="357">
                                Cyprus South (+357)
                              </option>
                              <option data-countryCode="CZ" value="42">
                                Czech Republic (+42)
                              </option>
                              <option data-countryCode="DK" value="45">
                                Denmark (+45)
                              </option>
                              <option data-countryCode="DJ" value="253">
                                Djibouti (+253)
                              </option>
                              <option data-countryCode="DM" value="1809">
                                Dominica (+1809)
                              </option>
                              <option data-countryCode="DO" value="1809">
                                Dominican Republic (+1809)
                              </option>
                              <option data-countryCode="EC" value="593">
                                Ecuador (+593)
                              </option>
                              <option data-countryCode="EG" value="20">
                                Egypt (+20)
                              </option>
                              <option data-countryCode="SV" value="503">
                                El Salvador (+503)
                              </option>
                              <option data-countryCode="GQ" value="240">
                                Equatorial Guinea (+240)
                              </option>
                              <option data-countryCode="ER" value="291">
                                Eritrea (+291)
                              </option>
                              <option data-countryCode="EE" value="372">
                                Estonia (+372)
                              </option>
                              <option data-countryCode="ET" value="251">
                                Ethiopia (+251)
                              </option>
                              <option data-countryCode="FK" value="500">
                                Falkland Islands (+500)
                              </option>
                              <option data-countryCode="FO" value="298">
                                Faroe Islands (+298)
                              </option>
                              <option data-countryCode="FJ" value="679">
                                Fiji (+679)
                              </option>
                              <option data-countryCode="FI" value="358">
                                Finland (+358)
                              </option>
                              <option data-countryCode="FR" value="33">
                                France (+33)
                              </option>
                              <option data-countryCode="GF" value="594">
                                French Guiana (+594)
                              </option>
                              <option data-countryCode="PF" value="689">
                                French Polynesia (+689)
                              </option>
                              <option data-countryCode="GA" value="241">
                                Gabon (+241)
                              </option>
                              <option data-countryCode="GM" value="220">
                                Gambia (+220)
                              </option>
                              <option data-countryCode="GE" value="7880">
                                Georgia (+7880)
                              </option>
                              <option data-countryCode="DE" value="49">
                                Germany (+49)
                              </option>
                              <option data-countryCode="GH" value="233">
                                Ghana (+233)
                              </option>
                              <option data-countryCode="GI" value="350">
                                Gibraltar (+350)
                              </option>
                              <option data-countryCode="GR" value="30">
                                Greece (+30)
                              </option>
                              <option data-countryCode="GL" value="299">
                                Greenland (+299)
                              </option>
                              <option data-countryCode="GD" value="1473">
                                Grenada (+1473)
                              </option>
                              <option data-countryCode="GP" value="590">
                                Guadeloupe (+590)
                              </option>
                              <option data-countryCode="GU" value="671">
                                Guam (+671)
                              </option>
                              <option data-countryCode="GT" value="502">
                                Guatemala (+502)
                              </option>
                              <option data-countryCode="GN" value="224">
                                Guinea (+224)
                              </option>
                              <option data-countryCode="GW" value="245">
                                Guinea - Bissau (+245)
                              </option>
                              <option data-countryCode="GY" value="592">
                                Guyana (+592)
                              </option>
                              <option data-countryCode="HT" value="509">
                                Haiti (+509)
                              </option>
                              <option data-countryCode="HN" value="504">
                                Honduras (+504)
                              </option>
                              <option data-countryCode="HK" value="852">
                                Hong Kong (+852)
                              </option>
                              <option data-countryCode="HU" value="36">
                                Hungary (+36)
                              </option>
                              <option data-countryCode="IS" value="354">
                                Iceland (+354)
                              </option>
                              <option data-countryCode="IN" value="91">
                                India (+91)
                              </option>
                              <option data-countryCode="ID" value="62">
                                Indonesia (+62)
                              </option>
                              <option data-countryCode="IR" value="98">
                                Iran (+98)
                              </option>
                              <option data-countryCode="IQ" value="964">
                                Iraq (+964)
                              </option>
                              <option data-countryCode="IE" value="353">
                                Ireland (+353)
                              </option>
                              <option data-countryCode="IL" value="972">
                                Israel (+972)
                              </option>
                              <option data-countryCode="IT" value="39">
                                Italy (+39)
                              </option>
                              <option data-countryCode="JM" value="1876">
                                Jamaica (+1876)
                              </option>
                              <option data-countryCode="JP" value="81">
                                Japan (+81)
                              </option>
                              <option data-countryCode="JO" value="962">
                                Jordan (+962)
                              </option>
                              <option data-countryCode="KZ" value="7">
                                Kazakhstan (+7)
                              </option>
                              <option data-countryCode="KE" value="254">
                                Kenya (+254)
                              </option>
                              <option data-countryCode="KI" value="686">
                                Kiribati (+686)
                              </option>
                              <option data-countryCode="KP" value="850">
                                Korea North (+850)
                              </option>
                              <option data-countryCode="KR" value="82">
                                Korea South (+82)
                              </option>
                              <option data-countryCode="KW" value="965">
                                Kuwait (+965)
                              </option>
                              <option data-countryCode="KG" value="996">
                                Kyrgyzstan (+996)
                              </option>
                              <option data-countryCode="LA" value="856">
                                Laos (+856)
                              </option>
                              <option data-countryCode="LV" value="371">
                                Latvia (+371)
                              </option>
                              <option data-countryCode="LB" value="961">
                                Lebanon (+961)
                              </option>
                              <option data-countryCode="LS" value="266">
                                Lesotho (+266)
                              </option>
                              <option data-countryCode="LR" value="231">
                                Liberia (+231)
                              </option>
                              <option data-countryCode="LY" value="218">
                                Libya (+218)
                              </option>
                              <option data-countryCode="LI" value="417">
                                Liechtenstein (+417)
                              </option>
                              <option data-countryCode="LT" value="370">
                                Lithuania (+370)
                              </option>
                              <option data-countryCode="LU" value="352">
                                Luxembourg (+352)
                              </option>
                              <option data-countryCode="MO" value="853">
                                Macao (+853)
                              </option>
                              <option data-countryCode="MK" value="389">
                                Macedonia (+389)
                              </option>
                              <option data-countryCode="MG" value="261">
                                Madagascar (+261)
                              </option>
                              <option data-countryCode="MW" value="265">
                                Malawi (+265)
                              </option>
                              <option data-countryCode="MY" value="60">
                                Malaysia (+60)
                              </option>
                              <option data-countryCode="MV" value="960">
                                Maldives (+960)
                              </option>
                              <option data-countryCode="ML" value="223">
                                Mali (+223)
                              </option>
                              <option data-countryCode="MT" value="356">
                                Malta (+356)
                              </option>
                              <option data-countryCode="MH" value="692">
                                Marshall Islands (+692)
                              </option>
                              <option data-countryCode="MQ" value="596">
                                Martinique (+596)
                              </option>
                              <option data-countryCode="MR" value="222">
                                Mauritania (+222)
                              </option>
                              <option data-countryCode="YT" value="269">
                                Mayotte (+269)
                              </option>
                              <option data-countryCode="MX" value="52">
                                Mexico (+52)
                              </option>
                              <option data-countryCode="FM" value="691">
                                Micronesia (+691)
                              </option>
                              <option data-countryCode="MD" value="373">
                                Moldova (+373)
                              </option>
                              <option data-countryCode="MC" value="377">
                                Monaco (+377)
                              </option>
                              <option data-countryCode="MN" value="976">
                                Mongolia (+976)
                              </option>
                              <option data-countryCode="MS" value="1664">
                                Montserrat (+1664)
                              </option>
                              <option data-countryCode="MA" value="212">
                                Morocco (+212)
                              </option>
                              <option data-countryCode="MZ" value="258">
                                Mozambique (+258)
                              </option>
                              <option data-countryCode="MN" value="95">
                                Myanmar (+95)
                              </option>
                              <option data-countryCode="NA" value="264">
                                Namibia (+264)
                              </option>
                              <option data-countryCode="NR" value="674">
                                Nauru (+674)
                              </option>
                              <option data-countryCode="NP" value="977">
                                Nepal (+977)
                              </option>
                              <option data-countryCode="NL" value="31">
                                Netherlands (+31)
                              </option>
                              <option data-countryCode="NC" value="687">
                                New Caledonia (+687)
                              </option>
                              <option data-countryCode="NZ" value="64">
                                New Zealand (+64)
                              </option>
                              <option data-countryCode="NI" value="505">
                                Nicaragua (+505)
                              </option>
                              <option data-countryCode="NE" value="227">
                                Niger (+227)
                              </option>
                              <option data-countryCode="NG" value="234">
                                Nigeria (+234)
                              </option>
                              <option data-countryCode="NU" value="683">
                                Niue (+683)
                              </option>
                              <option data-countryCode="NF" value="672">
                                Norfolk Islands (+672)
                              </option>
                              <option data-countryCode="NP" value="670">
                                Northern Marianas (+670)
                              </option>
                              <option data-countryCode="NO" value="47">
                                Norway (+47)
                              </option>
                              <option data-countryCode="OM" value="968">
                                Oman (+968)
                              </option>
                              <option data-countryCode="PW" value="680">
                                Palau (+680)
                              </option>
                              <option data-countryCode="PA" value="507">
                                Panama (+507)
                              </option>
                              <option data-countryCode="PG" value="675">
                                Papua New Guinea (+675)
                              </option>
                              <option data-countryCode="PY" value="595">
                                Paraguay (+595)
                              </option>
                              <option data-countryCode="PE" value="51">
                                Peru (+51)
                              </option>
                              <option data-countryCode="PH" value="63">
                                Philippines (+63)
                              </option>
                              <option data-countryCode="PL" value="48">
                                Poland (+48)
                              </option>
                              <option data-countryCode="PT" value="351">
                                Portugal (+351)
                              </option>
                              <option data-countryCode="PR" value="1787">
                                Puerto Rico (+1787)
                              </option>
                              <option data-countryCode="QA" value="974">
                                Qatar (+974)
                              </option>
                              <option data-countryCode="RE" value="262">
                                Reunion (+262)
                              </option>
                              <option data-countryCode="RO" value="40">
                                Romania (+40)
                              </option>
                              <option data-countryCode="RU" value="7">
                                Russia (+7)
                              </option>
                              <option data-countryCode="RW" value="250">
                                Rwanda (+250)
                              </option>
                              <option data-countryCode="SM" value="378">
                                San Marino (+378)
                              </option>
                              <option data-countryCode="ST" value="239">
                                Sao Tome &amp; Principe (+239)
                              </option>
                              <option data-countryCode="SA" value="966">
                                Saudi Arabia (+966)
                              </option>
                              <option data-countryCode="SN" value="221">
                                Senegal (+221)
                              </option>
                              <option data-countryCode="CS" value="381">
                                Serbia (+381)
                              </option>
                              <option data-countryCode="SC" value="248">
                                Seychelles (+248)
                              </option>
                              <option data-countryCode="SL" value="232">
                                Sierra Leone (+232)
                              </option>
                              <option data-countryCode="SG" value="65">
                                Singapore (+65)
                              </option>
                              <option data-countryCode="SK" value="421">
                                Slovak Republic (+421)
                              </option>
                              <option data-countryCode="SI" value="386">
                                Slovenia (+386)
                              </option>
                              <option data-countryCode="SB" value="677">
                                Solomon Islands (+677)
                              </option>
                              <option data-countryCode="SO" value="252">
                                Somalia (+252)
                              </option>
                              <option data-countryCode="ZA" value="27">
                                South Africa (+27)
                              </option>
                              <option data-countryCode="ES" value="34">
                                Spain (+34)
                              </option>
                              <option data-countryCode="LK" value="94">
                                Sri Lanka (+94)
                              </option>
                              <option data-countryCode="SH" value="290">
                                St. Helena (+290)
                              </option>
                              <option data-countryCode="KN" value="1869">
                                St. Kitts (+1869)
                              </option>
                              <option data-countryCode="SC" value="1758">
                                St. Lucia (+1758)
                              </option>
                              <option data-countryCode="SD" value="249">
                                Sudan (+249)
                              </option>
                              <option data-countryCode="SR" value="597">
                                Suriname (+597)
                              </option>
                              <option data-countryCode="SZ" value="268">
                                Swaziland (+268)
                              </option>
                              <option data-countryCode="SE" value="46">
                                Sweden (+46)
                              </option>
                              <option data-countryCode="CH" value="41">
                                Switzerland (+41)
                              </option>
                              <option data-countryCode="SI" value="963">
                                Syria (+963)
                              </option>
                              <option data-countryCode="TW" value="886">
                                Taiwan (+886)
                              </option>
                              <option data-countryCode="TJ" value="7">
                                Tajikstan (+7)
                              </option>
                              <option data-countryCode="TH" value="66">
                                Thailand (+66)
                              </option>
                              <option data-countryCode="TG" value="228">
                                Togo (+228)
                              </option>
                              <option data-countryCode="TO" value="676">
                                Tonga (+676)
                              </option>
                              <option data-countryCode="TT" value="1868">
                                Trinidad &amp; Tobago (+1868)
                              </option>
                              <option data-countryCode="TN" value="216">
                                Tunisia (+216)
                              </option>
                              <option data-countryCode="TR" value="90">
                                Turkey (+90)
                              </option>
                              <option data-countryCode="TM" value="7">
                                Turkmenistan (+7)
                              </option>
                              <option data-countryCode="TM" value="993">
                                Turkmenistan (+993)
                              </option>
                              <option data-countryCode="TC" value="1649">
                                Turks &amp; Caicos Islands (+1649)
                              </option>
                              <option data-countryCode="TV" value="688">
                                Tuvalu (+688)
                              </option>
                              <option data-countryCode="UG" value="256">
                                Uganda (+256)
                              </option>
                              <option data-countryCode="GB" value="44">
                                UK (+44)
                              </option>
                              <option data-countryCode="UA" value="380">
                                Ukraine (+380)
                              </option>
                              <option data-countryCode="AE" value="971">
                                United Arab Emirates (+971)
                              </option>
                              <option data-countryCode="UY" value="598">
                                Uruguay (+598)
                              </option>
                              <option data-countryCode="US" value="1">
                                USA (+1)
                              </option>
                              <option data-countryCode="UZ" value="7">
                                Uzbekistan (+7)
                              </option>
                              <option data-countryCode="VU" value="678">
                                Vanuatu (+678)
                              </option>
                              <option data-countryCode="VA" value="379">
                                Vatican City (+379)
                              </option>
                              <option data-countryCode="VE" value="58">
                                Venezuela (+58)
                              </option>
                              <option data-countryCode="VN" value="84">
                                Vietnam (+84)
                              </option>
                              <option data-countryCode="VG" value="84">
                                Virgin Islands - British (+1284)
                              </option>
                              <option data-countryCode="VI" value="84">
                                Virgin Islands - US (+1340)
                              </option>
                              <option data-countryCode="WF" value="681">
                                Wallis &amp; Futuna (+681)
                              </option>
                              <option data-countryCode="YE" value="969">
                                Yemen (North)(+969)
                              </option>
                              <option data-countryCode="YE" value="967">
                                Yemen (South)(+967)
                              </option>
                              <option data-countryCode="ZM" value="260">
                                Zambia (+260)
                              </option>
                              <option data-countryCode="ZW" value="263">
                                Zimbabwe (+263)
                              </option>
                            </select>
                            <input
                              style={{
                                marginLeft: "6px",
                              }}
                              type="phone"
                              pattern-check="true"
                              className="form-control"
                              name="contact_no"
                              id="contact_no"
                              value={register.contact_no}
                              aria-describedby="phoneHelp"
                              maxLength={10}
                              placeholder="000-000-0000"
                              onBlur={(e) =>
                                onBlur({ [e.target.name]: e.target.value })
                              }
                              onChange={(e) =>
                                onValueChange({
                                  [e.target.name]: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="password" className="form-label">
                            Password{" "}
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={register.password}
                            aria-describedby="passwordHelp"
                            placeholder="***********"
                            onChange={(e) =>
                              onValueChange({
                                [e.target.name]: e.target.value,
                              })
                            }
                            required
                          />
                          <p className=" mt-1">
                            *Use upper & lower case with minimum one number and
                            one symbol{" "}
                          </p>
                        </div>
                        <div className="my-4 mx-2">
                          <div className="form-check  d-flex align-items-center justify-content-start">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="tc"
                              checked={register.tc}
                              name="tc"
                              onChange={(e) =>
                                onValueChange({
                                  [e.target.name]: !register.tc,
                                })
                              }
                            />
                            <label
                              className="form-check-label mx-2"
                              htmlFor="gridCheck"
                            >
                              I have read and agree the{" "}
                            </label>
                            <a href="#" onClick={handleShow}>
                              {" "}
                              Terms & Conditions
                            </a>
                          </div>
                        </div>
                      </form>
                    ),
                    2: (
                      <>
                        {" "}
                        <form id="form-3">
                          <h5 className="w-100">You are a</h5>
                          <div className="row">
                            <div className="col">
                              <label htmlFor="student" className="w-100">
                                <input
                                  className="radio-button"
                                  type="radio"
                                  id="student"
                                  value={register.user_type}
                                  name="user_type"
                                  onClick={(e) =>
                                    onValueChange({
                                      user_type: "Student",
                                    })
                                  }
                                />
                                <div
                                  className={
                                    register.user_type == "Student"
                                      ? `card  my-4  logo-btn  active`
                                      : `card  my-4  logo-btn  `
                                  }
                                >
                                  {" "}
                                  <img src="/assets/svg/Student.svg" alt="" />
                                  <h3 className="subtitle-primary mt-4">
                                    Student
                                  </h3>
                                </div>
                              </label>
                            </div>
                            <div className="col">
                              <label htmlFor="professional" className="w-100">
                                <input
                                  className="radio-button"
                                  type="radio"
                                  id="professional"
                                  value={register.user_type}
                                  name="user_type"
                                  onClick={(e) =>
                                    onValueChange({
                                      user_type: "Professional",
                                    })
                                  }
                                />
                                <div
                                  className={
                                    register.user_type == "Professional"
                                      ? `card  my-4  logo-btn active `
                                      : "card  my-4  logo-btn"
                                  }
                                >
                                  {" "}
                                  <img
                                    src="/assets/svg/Professional.svg"
                                    alt=""
                                  />
                                  <h3 className="subtitle-primary mt-4">
                                    Professional
                                  </h3>
                                </div>
                              </label>
                            </div>
                          </div>
                        </form>
                      </>
                    ),
                    3: (
                      <>
                        <form id="form-6">
                          {register["user_type"] == "Student" ? (
                            <>
                              {" "}
                              <div className="mb-3">
                                <label
                                  htmlFor="college_name"
                                  className="form-label"
                                >
                                  College Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="student_college"
                                  id="student_college"
                                  aria-describedby="college_nameHelp"
                                  placeholder="College Name / NA"
                                  required
                                  value={register.student_college}
                                  onChange={(e) =>
                                    onValueChange({
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label htmlFor="stream" className="form-label">
                                  Stream
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="stream"
                                  id="stream"
                                  value={register.stream}
                                  aria-describedby="streamlHelp"
                                  placeholder="Stream / NA"
                                  required
                                  onChange={(e) =>
                                    onValueChange({
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              {" "}
                              <div className="mb-3">
                                <label
                                  htmlFor="companyname"
                                  className="form-label"
                                >
                                  Company Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="company_name"
                                  id="company_name"
                                  aria-describedby="companynamelHelp"
                                  placeholder="Company Name / NA"
                                  value={register.company_name}
                                  required
                                  onChange={(e) =>
                                    onValueChange({
                                      [e.target.name]: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="experince"
                                  className="form-label"
                                >
                                  Work experience
                                </label>
                                <div
                                  id="experince"
                                  className="flex-start flex-between "
                                  style={{ maxWidth: "8rem" }}
                                >
                                  <select
                                    id="work_experience_year"
                                    name="work_experience_year"
                                    className="form-select  m-2"
                                    defaultValue={
                                      register.work_experience_year || 0
                                    }
                                    onChange={(e) =>
                                      onValueChange({
                                        [e.target.name]: e.target.value,
                                      })
                                    }
                                  >
                                    <option value={0} disabled selected hidden>
                                      YY
                                    </option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                    <option value={16}>16</option>
                                    <option value={17}>17</option>
                                    <option value={18}>18</option>
                                    <option value={19}>19</option>
                                    <option value={20}>20</option>
                                    <option value={21}>21</option>
                                    <option value={22}>22</option>
                                    <option value={23}>23</option>
                                    <option value={24}>24</option>
                                    <option value={25}>25</option>
                                    <option value={26}>26</option>
                                    <option value={27}>27</option>
                                    <option value={28}>28</option>
                                    <option value={29}>29</option>
                                    <option value={30}>30</option>
                                  </select>
                                </div>
                              </div>
                            </>
                          )}

                          <div className="mb-3">
                            <label htmlFor="state" className="form-label">
                              Select State
                            </label>
                            <select
                              id="state"
                              name="state"
                              defaultValue={register.state || "default"}
                              className="form-select"
                              onChange={(e) =>
                                onValueChange({
                                  [e.target.name]: e.target.value,
                                })
                              }
                            >
                              <option value="default" disabled selected hidden>
                                Select State
                              </option>
                              <option value="International">
                                International
                              </option>
                              <option value="Andhra Pradesh">
                                Andhra Pradesh
                              </option>
                              <option value="Andaman and Nicobar Islands">
                                Andaman and Nicobar Islands
                              </option>
                              <option value="Arunachal Pradesh">
                                Arunachal Pradesh
                              </option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Dadar and Nagar Haveli">
                                Dadar and Nagar Haveli
                              </option>
                              <option value="Daman and Diu">
                                Daman and Diu
                              </option>
                              <option value="Delhi">Delhi</option>
                              <option value="Lakshadweep">Lakshadweep</option>
                              <option value="Puducherry">Puducherry</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal Pradesh">
                                Himachal Pradesh
                              </option>
                              <option value="Jammu and Kashmir">
                                Jammu and Kashmir
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Madhya Pradesh">
                                Madhya Pradesh
                              </option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Manipur">Manipur</option>
                              <option value="Meghalaya">Meghalaya</option>
                              <option value="Mizoram">Mizoram</option>
                              <option value="Nagaland">Nagaland</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Sikkim">Sikkim</option>
                              <option value="Tamil Nadu">Tamil Nadu</option>
                              <option value="Telangana">Telangana</option>
                              <option value="Tripura">Tripura</option>
                              <option value="Uttar Pradesh">
                                Uttar Pradesh
                              </option>
                              <option value="Uttarakhand">Uttarakhand</option>
                              <option value="West Bengal">West Bengal</option>
                            </select>
                          </div>
                        </form>
                      </>
                    ),
                    // 4: (
                    //   <>
                    //     {courses.length ? (
                    //       <form>
                    //         <div id="form-5">
                    //           <div className="mb-3">
                    //             <label htmlFor="course" className="form-label">
                    //               Course*
                    //             </label>
                    //             <select
                    //               className="form-select"
                    //               name="course_id"
                    //               id="course_id"
                    //               defaultValue={register.course_id || "default"}
                    //               required
                    //               onChange={(e) =>
                    //                 onValueChange({
                    //                   [e.target.name]: e.target.value,
                    //                 })
                    //               }
                    //             >
                    //               <option
                    //                 value="default"
                    //                 disabled
                    //                 selected
                    //                 hidden
                    //               >
                    //                 Select Course
                    //               </option>
                    //               {courses.map((course: any, index: number) => {
                    //                 return (
                    //                   <>
                    //                     <option
                    //                       value={course.course_id}
                    //                       key={index}
                    //                     >
                    //                       {course.course_name}
                    //                     </option>
                    //                   </>
                    //                 );
                    //               })}
                    //             </select>
                    //           </div>

                    //           <div className="mb-3">
                    //             <label htmlFor="course" className="form-label">
                    //               Course Mode*
                    //             </label>
                    //             <select
                    //               className="form-select"
                    //               name="course_mode"
                    //               id="course_mode"
                    //               defaultValue={register.course_mode || "3"}
                    //               required
                    //               onChange={(e) =>
                    //                 onValueChange({
                    //                   [e.target.name]: e.target.value,
                    //                 })
                    //               }
                    //             >
                    //               <option
                    //                 value="default"
                    //                 disabled
                    //                 selected
                    //                 hidden
                    //               >
                    //                 Select Course Mode
                    //               </option>
                    //               <option value="1">Online</option>
                    //               <option value="2">Offline</option>
                    //               <option value="3">Both</option>
                    //             </select>
                    //           </div>
                    //         </div>
                    //       </form>
                    //     ) : (
                    //       <></>
                    //     )}
                    //   </>
                    // ),
                  }[screen]
                }
                <div className="flex-between">
                  {screen != 1 ? (
                    <>
                      <button
                        type="button"
                        id="button-2"
                        onClick={onBackPress}
                        className="btn btn-warning "
                        style={{ marginRight: "20px" }}
                      >
                        Back
                      </button>
                    </>
                  ) : (
                    <></>
                  )}

                  <button
                    disabled={btnDisabled}
                    type="button"
                    id="button-1"
                    onClick={() => {
                      onNextPage();
                    }}
                    className="btn btn-primary btn-wide "
                  >
                    {screen == 4 ? "Submit" : "Next"}
                  </button>
                </div>
              </div>
              <div className="mx-auto mt-4">
                <h5 className="subtitle-primary text-center  ">
                  Already Registered ? <a href="/">Login now!</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Read Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            I hereby declare that during/ after the course if I indulge in any
            kind of illegal/ unethical ground, any trainer or employee of
            DataSpace Security or the company itself will not be liable for any
            of that. It is solely my responsibility and only I, Myself will be
            liable for that.
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onValueChange({
                agreement: true,
              });
              setScreen(screen + 1);
              handleClose();
            }}
          >
            Agree
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
