import axios from "axios";

// const data = [
//   {
//     parkingNumber: "PS001",
//     nearBy: "Library Front",
//     coordinates: [30.417014183708623, 77.96705281844322],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS002",
//     nearBy: "Library Front",
//     coordinates: [30.416986427239234, 77.96712256189494],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS003",
//     nearBy: "Library Front",
//     coordinates: [30.416972549001603, 77.96719767022759],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS004",
//     nearBy: "Library Front",
//     coordinates: [30.416949418601135, 77.96727277856021],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS005",
//     nearBy: "Library Front",
//     coordinates: [30.41692166211335, 77.96736398153558],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS006",
//     nearBy: "Library Front",
//     coordinates: [30.416903157783764, 77.96746054939182],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS007",
//     nearBy: "Library Front",
//     coordinates: [30.41688002736686, 77.96754102260535],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS008",
//     nearBy: "Library Front",
//     coordinates: [30.416856896944463, 77.96762149581889],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS009",
//     nearBy: "Library Front",
//     coordinates: [30.41681988825723, 77.96770733391337],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS010",
//     nearBy: "Library Front",
//     coordinates: [30.416801383908357, 77.9677878071269],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS011",
//     nearBy: "Library Front",
//     coordinates: [30.41677825346733, 77.96787901010222],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS012",
//     nearBy: "Library Front",
//     coordinates: [30.416759749110547, 77.96797021307756],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS013",
//     nearBy: "Library Front",
//     coordinates: [30.41673661865965, 77.96804532141019],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS014",
//     nearBy: "Library Front",
//     coordinates: [30.416713488203257, 77.96814188926645],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS015",
//     nearBy: "Library Front",
//     coordinates: [30.416699609926795, 77.96822772736088],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS016",
//     nearBy: "Library Front",
//     coordinates: [30.416667227274058, 77.96829210593172],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS017",
//     nearBy: "Library Front",
//     coordinates: [30.416639470705995, 77.96836721426436],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS018",
//     nearBy: "Library Front",
//     coordinates: [30.41660708803331, 77.9684154981925],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS019",
//     nearBy: "Library Back",
//     coordinates: [30.417171470219287, 77.96867301247579],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS020",
//     nearBy: "Library Back",
//     coordinates: [30.41718997449798, 77.96859253926226],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS021",
//     nearBy: "Library Back",
//     coordinates: [30.41723160911226, 77.96850670116783],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS022",
//     nearBy: "Library Back",
//     coordinates: [30.417273243708753, 77.9684047684307],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS023",
//     nearBy: "Library Back",
//     coordinates: [30.41731025222406, 77.96832429521713],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS024",
//     nearBy: "Library Back",
//     coordinates: [30.41734263466344, 77.96822236248],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS025",
//     nearBy: "Library Back",
//     coordinates: [30.417365764970707, 77.96815261902825],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS026",
//     nearBy: "Library Back",
//     coordinates: [30.417393521332187, 77.96806141605292],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS027",
//     nearBy: "Library Back",
//     coordinates: [30.417430529801894, 77.96798094283939],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS028",
//     nearBy: "Library Back",
//     coordinates: [30.417458286144953, 77.96788973986402],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS029",
//     nearBy: "Library Back",
//     coordinates: [30.417499920644733, 77.9677878071269],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS030",
//     nearBy: "Library Back",
//     coordinates: [30.417532303021193, 77.96770733391337],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS031",
//     nearBy: "Library Back",
//     coordinates: [30.417573937489394, 77.96761613093798],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS032",
//     nearBy: "Library Back",
//     coordinates: [30.4176063198413, 77.96751956308175],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS033",
//     nearBy: "Library Back",
//     coordinates: [30.4176433282303, 77.96742299522552],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS034",
//     nearBy: "Library Back",
//     coordinates: [30.417671084512826, 77.96732642736924],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS035",
//     nearBy: "Library Back",
//     coordinates: [30.417694214742255, 77.96726741367932],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS036",
//     nearBy: "Library Back",
//     coordinates: [30.41771734496619, 77.96718157558487],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS037",
//     nearBy: "Guest House",
//     coordinates: [30.418013411348387, 77.96913420893583],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS038",
//     nearBy: "Guest House",
//     coordinates: [30.418013411348387, 77.96922541191114],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS039",
//     nearBy: "Guest House",
//     coordinates: [30.418004159287534, 77.96930052024378],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS040",
//     nearBy: "Guest House",
//     coordinates: [30.418004159287534, 77.96940245298096],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS041",
//     nearBy: "Guest House",
//     coordinates: [30.41799490722582, 77.96948829107538],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS042",
//     nearBy: "Guest House",
//     coordinates: [30.418004159287534, 77.96957949405072],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS043",
//     nearBy: "Guest House",
//     coordinates: [30.41810593190863, 77.96959022381252],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS044",
//     nearBy: "Guest House",
//     coordinates: [30.418198452381148, 77.96959558869341],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS045",
//     nearBy: "Guest House",
//     coordinates: [30.41830485081609, 77.96957949405072],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS046",
//     nearBy: "Guest House",
//     coordinates: [30.41840199711191, 77.96956876428891],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS047",
//     nearBy: "Guest House",
//     coordinates: [30.418374241037267, 77.96968679166879],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS048",
//     nearBy: "Guest House",
//     coordinates: [30.418290972765956, 77.96967606190694],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS049",
//     nearBy: "Guest House",
//     coordinates: [30.418189200337828, 77.96969215654968],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS050",
//     nearBy: "Guest House",
//     coordinates: [30.41810593190863, 77.96968679166879],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS051",
//     nearBy: "Guest House",
//     coordinates: [30.41800878531806, 77.96969215654968],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS052",
//     nearBy: "Guest House",
//     coordinates: [30.417883882416696, 77.96967069702605],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS053",
//     nearBy: "Guest House",
//     coordinates: [30.417888508452922, 77.96955266964622],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS054",
//     nearBy: "Guest House",
//     coordinates: [30.417888508452922, 77.96944537202816],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS055",
//     nearBy: "Guest House",
//     coordinates: [30.417893134488946, 77.96932734464826],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS056",
//     nearBy: "Guest House",
//     coordinates: [30.417897760524742, 77.96922004703026],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS057",
//     nearBy: "Guest House",
//     coordinates: [30.41791626466573, 77.96912884405491],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS058",
//     nearBy: "10th Block",
//     coordinates: [30.416366530699694, 77.9689780575932],
//     parkingStatus: "unavailable",
//   },
//   {
//     parkingNumber: "PS059",
//     nearBy: "10th Block",
//     coordinates: [30.416343400155593, 77.96906926056857],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS060",
//     nearBy: "10th Block",
//     coordinates: [30.416315643495444, 77.96917655818659],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS061",
//     nearBy: "10th Block",
//     coordinates: [30.416292512939286, 77.96927312604282],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS062",
//     nearBy: "10th Block",
//     coordinates: [30.416269382377653, 77.9693589641373],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS063",
//     nearBy: "10th Block",
//     coordinates: [30.41623699958215, 77.96945016711264],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS064",
//     nearBy: "11th Block",
//     coordinates: [30.41620924289172, 77.96954673496886],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS065",
//     nearBy: "11th Block",
//     coordinates: [30.41619073842708, 77.96963257306335],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS066",
//     nearBy: "11th Block",
//     coordinates: [30.4161629817235, 77.96972377603868],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS067",
//     nearBy: "11th Block",
//     coordinates: [30.416139851131156, 77.9698257087758],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS068",
//     nearBy: "11th Block",
//     coordinates: [30.416112094413123, 77.96990618198939],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS069",
//     nearBy: "11th Block",
//     coordinates: [30.416098216051143, 77.9699973849647],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS070",
//     nearBy: "11th Block",
//     coordinates: [30.416061207076208, 77.97007249329735],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS071",
//     nearBy: "11th Block",
//     coordinates: [30.416042702583475, 77.97015296651088],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS072",
//     nearBy: "11th Block",
//     coordinates: [30.416010319712758, 77.9702388046053],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS073",
//     nearBy: "11th Block",
//     coordinates: [30.415931675553434, 77.97017442603448],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS074",
//     nearBy: "11th Block",
//     coordinates: [30.415954806195117, 77.97008322305915],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS075",
//     nearBy: "11th Block",
//     coordinates: [30.41598256295788, 77.969981290322],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS076",
//     nearBy: "11th Block",
//     coordinates: [30.41601494583781, 77.96987935758484],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS077",
//     nearBy: "11th Block",
//     coordinates: [30.41603345033581, 77.9697666950859],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS078",
//     nearBy: "11th Block",
//     coordinates: [30.41605658095337, 77.96968085699143],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS079",
//     nearBy: "11th Block",
//     coordinates: [30.41607971156543, 77.96957892425431],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS080",
//     nearBy: "11th Block",
//     coordinates: [30.416112094413123, 77.96948772127898],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS081",
//     nearBy: "10th Block",
//     coordinates: [30.41614447725008, 77.9693804236609],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS082",
//     nearBy: "10th Block",
//     coordinates: [30.4161629817235, 77.96928385580468],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS083",
//     nearBy: "10th Block",
//     coordinates: [30.416195364543558, 77.96917655818659],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS084",
//     nearBy: "10th Block",
//     coordinates: [30.416213869007336, 77.96907462544947],
//     parkingStatus: "parked",
//   },
//   {
//     parkingNumber: "PS085",
//     nearBy: "10th Block",
//     coordinates: [30.416246251810527, 77.9689834224741],
//     parkingStatus: "unavailable",
//   },
// ];

const test = (query, data) => {
  axios
    .post("http://localhost:3000/api/parkingspot/updateParkingSpot", {
      query,
      data,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

for (let i = 1; i <= 85; i++) {
  const ps = i < 10 ? `PS00${i}` : `PS0${i}`;
  setTimeout(() => {
    test(
      { parkingNumber: ps },
      {
        parkingStatus: "available",
        currentlyParkedUser: null,
        currentlyParkedVehicle: null,
        lastParkedVehicle: null,
        updatedAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      }
    );
  }, 1000);
}
