import React, { useState } from 'react';



const PricingPage: React.FC = (props: { disableCustomTheme?: boolean }) => {
    const [totalUsers, setTotalUsers] = useState(100);
    const [freeRatio, setFreeRatio] = useState(60);
    const [basicRatio, setBasicRatio] = useState(30);
    const [proRatio, setProRatio] = useState(10);
    const [basicOverUsage, setBasicOverUsage] = useState(20);
    const [proOverUsage, setProOverUsage] = useState(30);
    const [overUsageAvg, setOverUsageAvg] = useState(500);
    const [aiUpgradeRatio, setAiUpgradeRatio] = useState(10);
    const [storageUpgradeRatio, setStorageUpgradeRatio] = useState(5);
    const [growthRate, setGrowthRate] = useState(5);
    const [months, setMonths] = useState(12);
    const [result, setResult] = useState<string | null>(null);

    const simulate = () => {
        let users = totalUsers;
        const freeRatioDecimal = freeRatio / 100;
        const basicRatioDecimal = basicRatio / 100;
        const proRatioDecimal = proRatio / 100;
        const basicOverUsageDecimal = basicOverUsage / 100;
        const proOverUsageDecimal = proOverUsage / 100;
        const aiUpgradeRatioDecimal = aiUpgradeRatio / 100;
        const storageUpgradeRatioDecimal = storageUpgradeRatio / 100;
        const growthRateDecimal = growthRate / 100;

        const basicPlanFee = 100000;
        const proPlanFee = 400000;
        const avgCostPerRequest = 9;

        let html = `<h2>월별 시뮬레이션 결과</h2><table><tr><th>월</th><th>사용자 수</th><th>매출(원)</th><th>원가(원)</th><th>이익(원)</th></tr>`;

        for (let month = 1; month <= months; month++) {
            const freeUsers = users * freeRatioDecimal;
            const basicUsers = users * basicRatioDecimal;
            const proUsers = users * proRatioDecimal;

            const basicBaseRevenue = basicUsers * basicPlanFee;
            const proBaseRevenue = proUsers * proPlanFee;

            const basicOverRevenue = basicUsers * basicOverUsageDecimal * overUsageAvg * 25;
            const proOverRevenue = proUsers * proOverUsageDecimal * overUsageAvg * 20;

            const totalRequests = basicUsers * 5000 + proUsers * 25000;
            const aiUpgradeRevenue = totalRequests * aiUpgradeRatioDecimal * 10;
            const storageUpgradeRevenue = totalRequests * storageUpgradeRatioDecimal * (10000 / 100000);

            const totalRevenue = basicBaseRevenue + proBaseRevenue + basicOverRevenue + proOverRevenue + aiUpgradeRevenue + storageUpgradeRevenue;
            const totalCost = totalRequests * avgCostPerRequest;
            const profit = totalRevenue - totalCost;

            html += `<tr>
                    <td>${month}</td>
                    <td>${Math.round(users).toLocaleString()}</td>
                    <td>${Math.round(totalRevenue).toLocaleString()}</td>
                    <td>${Math.round(totalCost).toLocaleString()}</td>
                    <td>${Math.round(profit).toLocaleString()}</td>
                </tr>`;

            users *= 1 + growthRateDecimal;
        }

        html += `</table>`;
        setResult(html);
    };

    return (
        <div>
            <h1>주소 정제 서비스 수익 시뮬레이터</h1>
            <label>
                초기 총 사용자 수: <input type="number" value={totalUsers} onChange={(e) => setTotalUsers(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Free 사용자 비율 (%): <input type="number" value={freeRatio} onChange={(e) => setFreeRatio(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Basic 사용자 비율 (%): <input type="number" value={basicRatio} onChange={(e) => setBasicRatio(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Pro 사용자 비율 (%): <input type="number" value={proRatio} onChange={(e) => setProRatio(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Basic 초과 사용률 (%): <input type="number" value={basicOverUsage} onChange={(e) => setBasicOverUsage(Number(e.target.value))} />
            </label>
            <br />
            <label>
                Pro 초과 사용률 (%): <input type="number" value={proOverUsage} onChange={(e) => setProOverUsage(Number(e.target.value))} />
            </label>
            <br />
            <label>
                평균 초과 사용 건수: <input type="number" value={overUsageAvg} onChange={(e) => setOverUsageAvg(Number(e.target.value))} />
            </label>
            <br />
            <label>
                고급 번역 사용률 (%): <input type="number" value={aiUpgradeRatio} onChange={(e) => setAiUpgradeRatio(Number(e.target.value))} />
            </label>
            <br />
            <label>
                추가 데이터 보관 비율 (%): <input type="number" value={storageUpgradeRatio} onChange={(e) => setStorageUpgradeRatio(Number(e.target.value))} />
            </label>
            <br />
            <label>
                월 사용자 성장률 (%): <input type="number" value={growthRate} onChange={(e) => setGrowthRate(Number(e.target.value))} />
            </label>
            <br />
            <label>
                시뮬레이션 기간 (개월): <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
            </label>
            <br />
            <button onClick={simulate}>시뮬레이션 실행</button>
            <div dangerouslySetInnerHTML={{ __html: result || '' }} />
        </div>
    );
};

export default PricingPage;