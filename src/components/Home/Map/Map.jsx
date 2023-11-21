import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon, divIcon } from "leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";

import greenMarker from "../../../assets/marker/greenlocation.png";
import yellowMarker from "../../../assets/marker/yellowlocation.png";
import blackMarker from "../../../assets/marker/blacklocation.png";
import redMarker from "../../../assets/marker/redlocation.png";

const Map = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mapContainer = [styles.mapContainer].join("");

  const [coordinates, setCoordinates] = useState([]);
  const [loggedCoordinates, setLoggedCoordinates] = useState([]);

  const coordinates1 = [
    [30.415797829416945, 77.9663121700287],
    [30.415810797815844, 77.96637225151066],
    [30.415833029352832, 77.96640014648438],
    [30.415881197665534, 77.96640014648438],
    [30.41595715534115, 77.96643018722536],
    [30.416042376077552, 77.96647739410399],
    [30.416116481005236, 77.96652460098268],
    [30.416147975582476, 77.96656751632692],
    [30.41628506950612, 77.96655464172366],
    [30.41644068940231, 77.96653532981874],
    [30.41654628847623, 77.96653532981874],
    [30.41666670833341, 77.96655249595642],
    [30.416796391090337, 77.96662545204164],
    [30.416872348053634, 77.96675634384154],
    [30.41693718931701, 77.96686792373659],
    [30.416976094054363, 77.96699237823486],
    [30.416946452351134, 77.96711897850037],
    [30.416909400209406, 77.96726059913635],
    [30.416866790229054, 77.96743440628056],
    [30.416816769793616, 77.96759963035585],
    [30.41677230716278, 77.96777987480165],
    [30.41671858145686, 77.96798372268678],
    [30.4166611504971, 77.96819615364076],
    [30.4166166877954, 77.96834206581117],
    [30.41656481461778, 77.96843862533568],
    [30.41657963552849, 77.96851372718811],
    [30.41656666723175, 77.96857166290285],
    [30.416522204486974, 77.9686145782471],
    [30.41646847864335, 77.9686145782471],
    [30.416431426320177, 77.96859097480774],
    [30.416401784451505, 77.96858882904053],
    [30.41636658472078, 77.96872401237489],
    [30.416344353305366, 77.96881413459778],
    [30.416318416647638, 77.9689064025879],
    [30.41628506950612, 77.96900081634524],
    [30.416255427593, 77.96913385391237],
    [30.41622578567087, 77.96925830841066],
    [30.416194291118746, 77.96937417984009],
    [30.416162796556467, 77.96947503089908],
    [30.416135007228384, 77.96958231925966],
    [30.416107217892364, 77.96970891952517],
    [30.41607016543202, 77.9698441028595],
    [30.416014586715146, 77.9700071811676],
    [30.415986797344853, 77.97014665603636],
    [30.415967673121802, 77.97020351886749],
  ];

  const coordinates2 = [
    [30.416582742787796, 77.96853196620941],
    [30.416699457377188, 77.96856844425203],
    [30.416830992699538, 77.9686049222946],
    [30.41693103353024, 77.96864998340605],
    [30.4170755367713, 77.96868002414703],
    [30.417118146660535, 77.96869289875029],
    [30.417186692965014, 77.96849119663241],
    [30.41726450222527, 77.96826589107516],
    [30.417347869220972, 77.96803843975066],
    [30.417447909521822, 77.96776807308198],
    [30.417536834147608, 77.96753847599032],
    [30.417607232752196, 77.96736681461336],
    [30.417681336491675, 77.96716940402985],
  ];

  const coordinates3 = [
    [30.417118407590596, 77.96869182586671],
    [30.417162609133793, 77.96871650218965],
    [30.417290438631557, 77.9687615633011],
    [30.41740715237459, 77.96879589557649],
    [30.4175738860511, 77.96885812282564],
    [30.417714683156056, 77.96890103816988],
    [30.417862890415527, 77.96895682811738],
    [30.418003687103557, 77.96901261806488],
    [30.41797589829963, 77.9691563844681],
    [30.41796848795057, 77.96926152706146],
    [30.417959225013494, 77.96936666965485],
    [30.417948109487817, 77.96948683261871],
    [30.417948109487817, 77.96957695484163],
    [30.417951814663184, 77.96964776515959],
    [30.418211176589296, 77.96963489055635],
    [30.418407550160545, 77.96965205669406],
  ];

  // const [parkingCoordinatesArray, setParkingCoordinatesArray] = useState([
  //   { coordinates: [30.416990006119434, 77.96717848052764], status: "parked" },
  //   { coordinates: [30.416971481579512, 77.96724827597022], status: "parked" },
  //   { coordinates: [30.416948325899668, 77.96736639133455], status: "parked" },
  //   { coordinates: [30.41692053907659, 77.96744692453754], status: "parked" },
  //   { coordinates: [30.41686496540672, 77.96758114654246], status: "parked" },
  //   { coordinates: [30.416868824737495, 77.96763684867452], status: "parked" },
  //   { coordinates: [30.416827144465948, 77.96775496403885], status: "parked" },
  //   { coordinates: [30.41677620188771, 77.96791066156459], status: "parked" },
  //   { coordinates: [30.416739152723185, 77.96806635909032], status: "parked" },
  //   { coordinates: [30.41669747239627, 77.96822742549624], status: "parked" },
  //   { coordinates: [30.416727574856406, 77.96818290866781], status: "parked" },
  //   { coordinates: [30.416308455082795, 77.96916496636459], status: "parked" },
  //   { coordinates: [30.416289930413487, 77.96923476180712], status: "parked" },
  //   { coordinates: [30.416252881064363, 77.96934750829126], status: "parked" },
  //   { coordinates: [30.41623435638452, 77.96942267261403], status: "parked" },
  //   { coordinates: [30.416206569358195, 77.96951394357743], status: "parked" },
  //   { coordinates: [30.41617878232393, 77.96959447678037], status: "parked" },
  //   { coordinates: [30.416159678733262, 77.96972422474579], status: "parked" },
  //   { coordinates: [30.41614115403574, 77.96982086458935], status: "parked" },
  //   { coordinates: [30.416130154994924, 77.96989200233388], status: "parked" },
  //   { coordinates: [30.41607458087497, 77.97004233097941], status: "unparked" },
  //   {
  //     coordinates: [30.416032900264273, 77.97017655298433],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41590322713926, 77.97011212642195], status: "unparked" },
  //   {
  //     coordinates: [30.415958801356794, 77.96994032225568],
  //     status: "unparked",
  //   },
  //   {
  //     coordinates: [30.415977326088925, 77.96984905129229],
  //     status: "unparked",
  //   },
  //   {
  //     coordinates: [30.416009744361713, 77.96978999361015],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41602363790392, 77.96968261600618], status: "unparked" },
  //   { coordinates: [30.41605142498233, 77.96955376288145], status: "unparked" },
  //   {
  //     coordinates: [30.416093105585166, 77.96939269647552],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41612552381948, 77.96930679439235], status: "unparked" },
  //   {
  //     coordinates: [30.416162573216948, 77.96917794126762],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41617183556412, 77.96911888358542], status: "unparked" },
  //   {
  //     coordinates: [30.417247023565693, 77.96852627554402],
  //     status: "unparked",
  //   },
  //   {
  //     coordinates: [30.417270179174675, 77.96844037346085],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41728870365788, 77.9683329958569], status: "unparked" },
  //   { coordinates: [30.41731185925697, 77.96826320041434], status: "unparked" },
  //   { coordinates: [30.41734890820407, 77.96818803609159], status: "unparked" },
  //   {
  //     coordinates: [30.417381326021246, 77.96810750288859],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41740448159835, 77.96804307632623], status: "unparked" },
  //   {
  //     coordinates: [30.417441530510313, 77.96793032984208],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41746931718505, 77.96786590327972], status: "unparked" },
  //   {
  //     coordinates: [30.417497103851844, 77.96779610783713],
  //     status: "unparked",
  //   },
  //   { coordinates: [30.41754341494564, 77.96765114807182], status: "unparked" },
  //   {
  //     coordinates: [30.417580463804832, 77.96757598374906],
  //     status: "unparked",
  //   },
  // ]);

  const [parkingCoordinatesArray, setParkingCoordinatesArray] = useState([
    {
      parkingNumber: "PS001",
      coordinates: [30.417014183708623, 77.96705281844322],
      status: "parked",
    },
    {
      parkingNumber: "PS002",
      coordinates: [30.416986427239234, 77.96712256189494],
      status: "parked",
    },
    {
      parkingNumber: "PS003",
      coordinates: [30.416972549001603, 77.96719767022759],
      status: "parked",
    },
    {
      parkingNumber: "PS004",
      coordinates: [30.416949418601135, 77.96727277856021],
      status: "parked",
    },
    {
      parkingNumber: "PS005",
      coordinates: [30.41692166211335, 77.96736398153558],
      status: "parked",
    },
    {
      parkingNumber: "PS006",
      coordinates: [30.416903157783764, 77.96746054939182],
      status: "parked",
    },
    {
      parkingNumber: "PS007",
      coordinates: [30.41688002736686, 77.96754102260535],
      status: "parked",
    },
    {
      parkingNumber: "PS008",
      coordinates: [30.416856896944463, 77.96762149581889],
      status: "parked",
    },
    {
      parkingNumber: "PS009",
      coordinates: [30.41681988825723, 77.96770733391337],
      status: "parked",
    },
    {
      parkingNumber: "PS010",
      coordinates: [30.416801383908357, 77.9677878071269],
      status: "parked",
    },
    {
      parkingNumber: "PS011",
      coordinates: [30.41677825346733, 77.96787901010222],
      status: "parked",
    },
    {
      parkingNumber: "PS012",
      coordinates: [30.416759749110547, 77.96797021307756],
      status: "parked",
    },
    {
      parkingNumber: "PS013",
      coordinates: [30.41673661865965, 77.96804532141019],
      status: "parked",
    },
    {
      parkingNumber: "PS014",
      coordinates: [30.416713488203257, 77.96814188926645],
      status: "parked",
    },
    {
      parkingNumber: "PS015",
      coordinates: [30.416699609926795, 77.96822772736088],
      status: "parked",
    },
    {
      parkingNumber: "PS016",
      coordinates: [30.416667227274058, 77.96829210593172],
      status: "parked",
    },
    {
      parkingNumber: "PS017",
      coordinates: [30.416639470705995, 77.96836721426436],
      status: "parked",
    },
    {
      parkingNumber: "PS018",
      coordinates: [30.41660708803331, 77.9684154981925],
      status: "parked",
    },
    {
      parkingNumber: "PS019",
      coordinates: [30.417171470219287, 77.96867301247579],
      status: "parked",
    },
    {
      parkingNumber: "PS020",
      coordinates: [30.41718997449798, 77.96859253926226],
      status: "parked",
    },
    {
      parkingNumber: "PS021",
      coordinates: [30.41723160911226, 77.96850670116783],
      status: "parked",
    },
    {
      parkingNumber: "PS022",
      coordinates: [30.417273243708753, 77.9684047684307],
      status: "parked",
    },
    {
      parkingNumber: "PS023",
      coordinates: [30.41731025222406, 77.96832429521713],
      status: "parked",
    },
    {
      parkingNumber: "PS024",
      coordinates: [30.41734263466344, 77.96822236248],
      status: "parked",
    },
    {
      parkingNumber: "PS025",
      coordinates: [30.417365764970707, 77.96815261902825],
      status: "parked",
    },
    {
      parkingNumber: "PS026",
      coordinates: [30.417393521332187, 77.96806141605292],
      status: "parked",
    },
    {
      parkingNumber: "PS027",
      coordinates: [30.417430529801894, 77.96798094283939],
      status: "parked",
    },
    {
      parkingNumber: "PS028",
      coordinates: [30.417458286144953, 77.96788973986402],
      status: "parked",
    },
    {
      parkingNumber: "PS029",
      coordinates: [30.417499920644733, 77.9677878071269],
      status: "parked",
    },
    {
      parkingNumber: "PS030",
      coordinates: [30.417532303021193, 77.96770733391337],
      status: "parked",
    },
    {
      parkingNumber: "PS031",
      coordinates: [30.417573937489394, 77.96761613093798],
      status: "parked",
    },
    {
      parkingNumber: "PS032",
      coordinates: [30.4176063198413, 77.96751956308175],
      status: "parked",
    },
    {
      parkingNumber: "PS033",
      coordinates: [30.4176433282303, 77.96742299522552],
      status: "parked",
    },
    {
      parkingNumber: "PS034",
      coordinates: [30.417671084512826, 77.96732642736924],
      status: "parked",
    },
    {
      parkingNumber: "PS035",
      coordinates: [30.417694214742255, 77.96726741367932],
      status: "parked",
    },
    {
      parkingNumber: "PS036",
      coordinates: [30.41771734496619, 77.96718157558487],
      status: "parked",
    },
    {
      parkingNumber: "PS037",
      coordinates: [30.418013411348387, 77.96913420893583],
      status: "parked",
    },
    {
      parkingNumber: "PS038",
      coordinates: [30.418013411348387, 77.96922541191114],
      status: "parked",
    },
    {
      parkingNumber: "PS039",
      coordinates: [30.418004159287534, 77.96930052024378],
      status: "parked",
    },
    {
      parkingNumber: "PS040",
      coordinates: [30.418004159287534, 77.96940245298096],
      status: "parked",
    },
    {
      parkingNumber: "PS041",
      coordinates: [30.41799490722582, 77.96948829107538],
      status: "parked",
    },
    {
      parkingNumber: "PS042",
      coordinates: [30.418004159287534, 77.96957949405072],
      status: "parked",
    },
    {
      parkingNumber: "PS043",
      coordinates: [30.41810593190863, 77.96959022381252],
      status: "parked",
    },
    {
      parkingNumber: "PS044",
      coordinates: [30.418198452381148, 77.96959558869341],
      status: "parked",
    },
    {
      parkingNumber: "PS045",
      coordinates: [30.41830485081609, 77.96957949405072],
      status: "parked",
    },
    {
      parkingNumber: "PS046",
      coordinates: [30.41840199711191, 77.96956876428891],
      status: "parked",
    },
    {
      parkingNumber: "PS047",
      coordinates: [30.418374241037267, 77.96968679166879],
      status: "parked",
    },
    {
      parkingNumber: "PS048",
      coordinates: [30.418290972765956, 77.96967606190694],
      status: "parked",
    },
    {
      parkingNumber: "PS049",
      coordinates: [30.418189200337828, 77.96969215654968],
      status: "parked",
    },
    {
      parkingNumber: "PS050",
      coordinates: [30.41810593190863, 77.96968679166879],
      status: "parked",
    },
    {
      parkingNumber: "PS051",
      coordinates: [30.41800878531806, 77.96969215654968],
      status: "parked",
    },
    {
      parkingNumber: "PS052",
      coordinates: [30.417883882416696, 77.96967069702605],
      status: "parked",
    },
    {
      parkingNumber: "PS053",
      coordinates: [30.417888508452922, 77.96955266964622],
      status: "parked",
    },
    {
      parkingNumber: "PS054",
      coordinates: [30.417888508452922, 77.96944537202816],
      status: "parked",
    },
    {
      parkingNumber: "PS055",
      coordinates: [30.417893134488946, 77.96932734464826],
      status: "parked",
    },
    {
      parkingNumber: "PS056",
      coordinates: [30.417897760524742, 77.96922004703026],
      status: "parked",
    },
    {
      parkingNumber: "PS057",
      coordinates: [30.41791626466573, 77.96912884405491],
      status: "parked",
    },
    {
      parkingNumber: "PS058",
      coordinates: [30.416366530699694, 77.9689780575932],
      status: "sparked",
    },
    {
      parkingNumber: "PS059",
      coordinates: [30.416343400155593, 77.96906926056857],
      status: "parked",
    },
    {
      parkingNumber: "PS060",
      coordinates: [30.416315643495444, 77.96917655818659],
      status: "parked",
    },
    {
      parkingNumber: "PS061",
      coordinates: [30.416292512939286, 77.96927312604282],
      status: "parked",
    },
    {
      parkingNumber: "PS062",
      coordinates: [30.416269382377653, 77.9693589641373],
      status: "parked",
    },
    {
      parkingNumber: "PS063",
      coordinates: [30.41623699958215, 77.96945016711264],
      status: "parked",
    },
    {
      parkingNumber: "PS064",
      coordinates: [30.41620924289172, 77.96954673496886],
      status: "parked",
    },
    {
      parkingNumber: "PS065",
      coordinates: [30.41619073842708, 77.96963257306335],
      status: "parked",
    },
    {
      parkingNumber: "PS066",
      coordinates: [30.4161629817235, 77.96972377603868],
      status: "parked",
    },
    {
      parkingNumber: "PS067",
      coordinates: [30.416139851131156, 77.9698257087758],
      status: "parked",
    },
    {
      parkingNumber: "PS068",
      coordinates: [30.416112094413123, 77.96990618198939],
      status: "parked",
    },
    {
      parkingNumber: "PS069",
      coordinates: [30.416098216051143, 77.9699973849647],
      status: "parked",
    },
    {
      parkingNumber: "PS070",
      coordinates: [30.416061207076208, 77.97007249329735],
      status: "parked",
    },
    {
      parkingNumber: "PS071",
      coordinates: [30.416042702583475, 77.97015296651088],
      status: "parked",
    },
    {
      parkingNumber: "PS072",
      coordinates: [30.416010319712758, 77.9702388046053],
      status: "parked",
    },
    {
      parkingNumber: "PS073",
      coordinates: [30.415931675553434, 77.97017442603448],
      status: "parked",
    },
    {
      parkingNumber: "PS074",
      coordinates: [30.415954806195117, 77.97008322305915],
      status: "parked",
    },
    {
      parkingNumber: "PS075",
      coordinates: [30.41598256295788, 77.969981290322],
      status: "parked",
    },
    {
      parkingNumber: "PS076",
      coordinates: [30.41601494583781, 77.96987935758484],
      status: "parked",
    },
    {
      parkingNumber: "PS077",
      coordinates: [30.41603345033581, 77.9697666950859],
      status: "parked",
    },
    {
      parkingNumber: "PS078",
      coordinates: [30.41605658095337, 77.96968085699143],
      status: "parked",
    },
    {
      parkingNumber: "PS079",
      coordinates: [30.41607971156543, 77.96957892425431],
      status: "parked",
    },
    {
      parkingNumber: "PS080",
      coordinates: [30.416112094413123, 77.96948772127898],
      status: "parked",
    },
    {
      parkingNumber: "PS081",
      coordinates: [30.41614447725008, 77.9693804236609],
      status: "parked",
    },
    {
      parkingNumber: "PS082",
      coordinates: [30.4161629817235, 77.96928385580468],
      status: "parked",
    },
    {
      parkingNumber: "PS083",
      coordinates: [30.416195364543558, 77.96917655818659],
      status: "parked",
    },
    {
      parkingNumber: "PS084",
      coordinates: [30.416213869007336, 77.96907462544947],
      status: "parked",
    },
    {
      parkingNumber: "PS085",
      coordinates: [30.416246251810527, 77.9689834224741],
      status: "sparked",
    },
  ]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const clickedCoordinates = [lat, lng];
    const status = "parked";

    // Update component state with the new coordinates
    setCoordinates((prev) => [...prev, clickedCoordinates]);

    // Update logged coordinates
    setLoggedCoordinates((prev) => [...prev, clickedCoordinates]);

    // Update parkingCoordinatesArray with the new object
    setParkingCoordinatesArray((prev) => [
      ...prev,
      { coordinates: clickedCoordinates, status: status },
    ]);

    // Log the updated state
    console.log(parkingCoordinatesArray);
  };

  // const deleteParkingSpot = () => {
  //   setParkingCoordinatesArray((prev) => prev.slice(0, -1));
  // };

  // const MapClickHandler = () => {
  //   const map = useMapEvents({
  //     click: handleMapClick,
  //   });

  //   return null; // This hook doesn't render anything, so return null
  // };

  const customIcon = new Icon({
    iconUrl: greenMarker,
    iconSize: [20, 20],
  });

  const customBlackIcon = new Icon({
    iconUrl: blackMarker,
    iconSize: [20, 20],
  });

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <MapContainer
        center={[30.41757, 77.967754]}
        zoom={18}
        className={mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* enable this to console log coordinates */}
        {/* <MapClickHandler /> */}

        <MarkerClusterGroup
          chunkedLoading
          disableClusteringAtZoom={18}
          animate={true}
          spiderfyOnMaxZoom={false}
        >
          <Marker position={[30.416991, 77.966727]}>
            <Popup>
              <h2>Mac</h2>
            </Popup>
          </Marker>

          <Marker position={[30.416502, 77.968515]}>
            <Popup>
              <h2>Gandhi Chowk</h2>
            </Popup>
          </Marker>

          {/* parking markers */}
          {parkingCoordinatesArray.map(({ coordinates, status }, index) => (
            <Marker
              key={index}
              position={coordinates}
              icon={status == "parked" ? customIcon : customBlackIcon}
            >
              <Popup>
                <h2>Parking {index + 1}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <Polyline positions={coordinates1} color="red" />
        <Polyline positions={coordinates2} color="blue" />
        <Polyline positions={coordinates3} color="green" />
      </MapContainer>
      {/* <button
        onClick={() => console.log("Logged Coordinates:", loggedCoordinates)}
      >
        Log All Coordinates
      </button> */}
      {/* <button onClick={deleteParkingSpot} style={{ backgroundColor: "red" }}>
        BUTTON
      </button> */}
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Map;
