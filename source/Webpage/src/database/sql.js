import mysql from 'mysql2';

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: 'localhost',
    user: 'root',
    database: 'fin',
    password: '*c011017c*',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

const promisePool = pool.promise();

function getToday(){ // 판매날짜 가져오기 위한 오늘 날짜
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

export const selectSql = {
    getusers: async () => {
        const sql = `select * from user`;
        const [result] = await promisePool.query(sql);

        return result;
    },
//전체 중고차 정보 조회 (관리자용), 기본 car0을 보게 되어있음
    getcar: async (model) => {
        const sql = `select * from car where model="${model}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    gettruck: async (model) => {
        const sql = `select * from truck where model="${model}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getsuv: async (model) => {
        const sql = `select * from suv where model="${model}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
// 구매 확정된 차 (사용자 용)
    getmycar: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select car.Vin, car.Price, car.Model, car.Engine_size, car.SSid, car.CSsn from car, customer where car.SSid is not NULL and car.CSsn=customer.Ssn and customer.Cus_Id="${k}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getmytruck: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select truck.Vin, truck.Price, truck.Model, truck.Tonnage, truck.SSid, truck.CSsn from truck, customer where truck.SSid is not NULL and truck.CSsn=customer.Ssn and customer.Cus_Id="${k}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getmysuv: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select suv.Vin, suv.Price, suv.Model, suv.No_seats, suv.SSid, suv.CSsn from suv, customer where suv.SSid is not NULL and suv.CSsn=customer.Ssn and customer.Cus_Id="${k}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },

//예약 안된 중고차 : 딜러, 예약자 모두 NULL
    getnotrescar: async (model) => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select car.Vin, car.Price, car.Model, car.Engine_size, customer.Ssn from car, customer where customer.cus_id="${k}" and car.SSid is NULL and car.CSsn is NULL and car.model="${model}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getnotrestruck: async (model) => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select truck.Vin, truck.Price, truck.Model, truck.Tonnage, customer.Ssn from truck, customer where customer.cus_id="${k}" and truck.SSid is NULL and truck.CSsn is NULL and truck.model="${model}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getnotressuv: async (model) => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select suv.Vin, suv.Price, suv.Model, suv.No_seats, customer.Ssn from suv, customer where customer.cus_id="${k}" and suv.SSid is NULL and suv.CSsn is NULL and suv.model="${model}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
// 예약 확정된 중고차 : 딜러 NULL, 예약자 O
    getrescar: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select car.Vin, car.Price, car.Model, car.Engine_size, car.CSsn from car, customer where car.SSid is NULL and car.CSsn=customer.Ssn and customer.Cus_Id="${k}"`;
        const [result] = await promisePool.query(sql);

        
        return result;
    },
    getrestruck: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select truck.Vin, truck.Price, truck.Model, truck.Tonnage, truck.CSsn from truck, customer where truck.SSid is NULL and truck.CSsn=customer.Ssn and customer.Cus_Id="${k}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getressuv: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select suv.Vin, suv.Price, suv.Model, suv.No_seats, suv.CSsn from suv, customer where suv.SSid is NULL and suv.CSsn=customer.Ssn and customer.Cus_Id="${k}"`;
        const [result] = await promisePool.query(sql);

        return result;
    },
// 예약 확정된 중고차2(관리자용) : 딜러 NULL, 예약자 O
    getrescar2: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select car.Vin, car.Price, car.Model, car.Engine_size, car.CSsn, salesperson.Sid from car, salesperson where salesperson.Sale_Id="${k}" and car.SSid is NULL and car.CSsn is not NULL`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getrestruck2: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select truck.Vin, truck.Price, truck.Model, truck.Tonnage, truck.CSsn, salesperson.Sid from truck, salesperson where salesperson.Sale_Id="${k}" and truck.SSid is NULL and truck.CSsn is not NULL`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getressuv2: async () => {
        const { k } = require('C:/Users/aille/Desktop/DBfinal/src/routes/login');
        const sql = `select suv.Vin, suv.Price, suv.Model, suv.No_seats, suv.CSsn, salesperson.Sid from suv, salesperson where salesperson.Sale_Id="${k}" and suv.SSid is NULL and suv.CSsn is not NULL`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getsalecar: async () => {
        const sql = `select * from car where SSid is not NULL and CSsn is not NULL`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getsaletruck: async () => {
        const sql = `select * from truck where SSid is not NULL and CSsn is not NULL`;
        const [result] = await promisePool.query(sql);

        return result;
    },
    getsalesuv: async () => {
        const sql = `select * from suv where SSid is not NULL and CSsn is not NULL`;
        const [result] = await promisePool.query(sql);

        return result;
    },
}

export const updateSql = {
    updatecar: async (data) => {
        console.log(data);
        const sql = `update car set Price="${data.Price}", Model="${data.Model}", Engine_size="${data.Engine_size}" where Vin="${data.Vin}"`;
        await promisePool.query(sql);
    },
    updatetruck: async (data) => {
        console.log(data);
        const sql = `update truck set Price="${data.Price}", Model="${data.Model}", Tonnage="${data.Tonnage}" where Vin="${data.Vin}"`;
        await promisePool.query(sql);
    },
    updatesuv: async (data) => {
        console.log(data);
        const sql = `update suv set Price="${data.Price}", Model="${data.Model}", No_seats="${data.No_seats}" where Vin="${data.Vin}"`;
        await promisePool.query(sql);
    },

// 구매 예약하기 : CSsn 등록
    updatecarres: async (data) => {
      console.log(data);
      const sql = `update car set CSsn="${data.Ssn}" where Vin="${data.Vin}"`;
      await promisePool.query(sql);
    },

    updatetruckres: async (data) => {
        console.log(data);
        const sql = `update truck set CSsn="${data.Ssn}" where Vin="${data.Vin}"`;
        await promisePool.query(sql);
    },

    updatesuvres: async (data) => {
        console.log(data);
        const sql = `update suv set CSsn="${data.Ssn}" where Vin="${data.Vin}"`;
        await promisePool.query(sql);
    },
// 예약 취소 : 예약자 -> NULL
    cancelcarres: async (data) => {
        console.log(data);
        const sql = `update car set CSsn=NULL where Vin="${data.Vin}" and Model="${data.Model}"`;
        await promisePool.query(sql);
    },
    canceltruckres: async (data) => {
        console.log(data);
        const sql = `update truck set CSsn=NULL where Vin="${data.Vin}" and Model="${data.Model}"`;
        await promisePool.query(sql);
    },
    cancelsuvres: async (data) => {
        console.log(data);
        const sql = `update suv set CSsn=NULL where Vin="${data.Vin}" and Model="${data.Model}"`;
        await promisePool.query(sql);
    },
// 판매 성공 : 딜러 생김
    carsalesucc: async (data) => {
        const today=getToday();
        console.log(data);
        const sql = `update car set Sale_date="${today}", SSid="${data.Sid}" where Vin="${data.Vin}" and Model="${data.Model}"`;
        await promisePool.query(sql);
    },
    trucksalesucc: async (data) => {
        const today=getToday();
        console.log(data);
        const sql = `update truck set Sale_date="${today}", SSid="${data.Sid}" where Vin="${data.Vin}" and Model="${data.Model}"`;
        await promisePool.query(sql);
    },
    suvsalesucc: async (data) => {
        const today=getToday();
        console.log(data);
        const sql = `update suv set Sale_date="${today}", SSid="${data.Sid}" where Vin="${data.Vin}" and Model="${data.Model}"`;
        await promisePool.query(sql);
    },
}

export const deleteSql={
    deletecar: async (data)=>{
        console.log("deleteSql.deletecar:", data.Vin);
        const sql=`delete from car where Vin=${data.Vin}`
        await promisePool.query(sql);
    },

    deletetruck: async (data)=>{
        console.log("deleteSql.deletetruck:", data.Vin);
        const sql=`delete from truck where Vin=${data.Vin}`
        await promisePool.query(sql);
    },

    deletesuv: async (data)=>{
        console.log("deleteSql.deletesuv:", data.Vin);
        const sql=`delete from suv where Vin=${data.Vin}`
        await promisePool.query(sql);
    },

};

