<?php
/**
 * Desc: MultithreadingRepository 仓库类
 * User: lisgroup
 * Date: 2019-01-28
 * Time: 18:15
 */

namespace App\Http\Repository;


use GuzzleHttp\Pool;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Reader\Exception;
use PhpOffice\PhpSpreadsheet\Spreadsheet;

class MultithreadingRepository
{
    /**
     * @var array 原始数据
     */
    public $dataSet;
    /**
     * @var array 请求后的数据
     */
    public $data = [];

    public $fileName;
    public $config;

    /**
     * @var int 默认并发请求数 5
     */
    protected $concurrent = 5;

    /**
     * @var self 单例
     */
    private static $instance;

    /**
     * 获取单例
     *
     * @return MultithreadingRepository
     */
    public static function getInstent()
    {
        if (!isset(self::$instance)) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    /**
     * 设置参数
     *
     * @param $fileName
     * @param array $config
     */
    public function setParam($fileName, $config = [])
    {
        $this->fileName = $fileName;
        $this->config = $config;
        $this->concurrent = $config['concurrent'] ?? 5;
        // $this->config || $this->config = $config ? $config : config('apiParam');
    }

    /**
     *  执行 1, 2, 3. 并发请求处理操作
     *
     * @param string $url
     * @param string $appKey
     *
     * @return array
     */
    public function multiRequest($url, $appKey)
    {
        try {
            /************************* 1. 读取 Excel 文件 ******************************/
            if (!$this->loadExcel()) {
                return [];
            }
            /************************* 2. 发送并发请求   ******************************/
            // $config = $this->config;
            return $this->request($url, $appKey);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * 1. 读取 Excel 文件
     * 文件暂只支持 xlsx 文件
     * @return bool
     */
    public function loadExcel()
    {
        /************************* 1. 读取 Excel 文件 ******************************/
        try {
            // 设置以 Excel2007 格式
            $reader = \PHPExcel_IOFactory::createReader('Excel2007');
            // 载入 Excel 文件
            $excel = $reader->load($this->fileName);

            // 读取一个工作表
            $sheet = $excel->getSheet();
            // 取得总行数
            $highestRow = $sheet->getHighestRow();
            // 取得总列数
            $highestColumn = $sheet->getHighestColumn();
            // 1. 根据第一列数据查询需要哪些参数
            $dataSet = [];

            // 先取单元格第一列--作为参数数组
            $params = [];
            for ($i = 'A'; $i <= $highestColumn; $i++) {
                $val = $sheet->getCell($i.'1')->getValue();
                $params[$i] = (is_object($val)) ? trim($val->__toString()) : trim($val);
            }
            $dataSet['param'] = array_values($params);

            // 循环读取每个单元格的数据
            for ($row = 2; $row <= $highestRow; $row++) {
                //    $dataSet[$row - 2]['name'] = $sheet->getCell('B'.$row)->getValue();
                // for ($i = 'A'; $i <= $highestColumn; $i++) {
                //     $value = $sheet->getCell($i.'1')->getValue();
                //     $dataSet['data'][$row - 2][$value] = $sheet->getCell($i.$row)->getValue();
                // }
                foreach ($params as $key => $param) {
                    $value = $sheet->getCell($key.$row)->getValue();
                    $dataSet['data'][$row - 2][$param] = (is_object($value)) ? trim($value->__toString()) : trim($value);
                }

            }

            $this->dataSet = $dataSet;
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * 2. 发送并发请求
     *
     * @param $url
     * @param $appkey
     *
     * @return array
     */
    public function request($url, $appkey)
    {
        $client = new Client();
        // 简单本地并发的 GET 请求测试
        $requests = function($url, $appkey, $dataSet) use ($client) {
            foreach ($dataSet as $key => $value) {
                $params = array_merge($value, ['key' => $appkey]);
                $uri = $url.'?'.http_build_query($params);
                yield function() use ($client, $uri) {
                    return $client->getAsync($uri);
                };
            }
        };

        $pool = new Pool($client, $requests($url, $appkey, $this->dataSet['data']), [
            'concurrency' => $this->concurrent, // 并发设置
            'fulfilled' => function($response, $index) {
                // this is delivered each successful response
                $result = $response->getBody()->getContents();
                // var_dump($result);
                // var_dump($index);
                $this->data[$index] = $result;
            },
            'rejected' => function($reason, $index) {
                // this is delivered each failed request
                return 'Index: '.$index.' Reason:'.$reason;
            },
        ]);

        // Initiate the transfers and create a promise
        $promise = $pool->promise();
        // Force the pool of requests to complete.
        $promise->wait();

        // 处理 data 数据然后返回
        $returnArray = [];
        foreach ($this->data as $k => $v) {
            $returnArray[$k]['param'] = $this->dataSet['data'][$k];
            $returnArray[$k]['result'] = $v;
        }
        return $returnArray;
    }

    /**
     *  执行 a, b 并发请求处理操作
     *
     * @param string $url
     * @param string $appKey
     *
     * @return array
     */
    public function newMultiRequest($url, $appKey)
    {
        try {
            /************************* 1. 读取 Excel 文件 ******************************/
            if (!$this->newLoadExcel()) {
                return [];
            }
            /************************* 2. 发送并发请求   ******************************/
            // $config = $this->config;
            return $this->newRequest($url, $appKey);
        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * a. 使用 PhpOffice/PhpSpreadsheet/IOFactory 获取 Excel 内容
     *
     * @return bool
     */
    public function newLoadExcel()
    {
        try {
            // new PhpOffice\PhpSpreadsheet\IOFactory 读取 Excel 文件
            $excel = IOFactory::load($this->fileName);
            // 1. 取出全部数组
            $data = $excel->getActiveSheet()->toArray('', true, true, true);
            // 2. 数组第一元素为参数名称
            $this->dataSet['param'] = array_shift($data);

            // 3. 循环数组每个单元格的数据
            $this->dataSet['data'] = $data;

            return true;
        } catch (Exception|\PhpOffice\PhpSpreadsheet\Exception $exception) {
            return false;
        }

    }

    /**
     * b. 发送并发请求
     *
     * @param $url
     * @param $appkey
     *
     * @return array
     */
    public function newRequest($url, $appkey)
    {
        $client = new Client();
        // 简单本地并发的 GET 请求测试
        $requests = function($url, $appkey, $dataSet) use ($client) {
            $newParam = [];
            // 2.1 处理请求参数列
            foreach ($dataSet['param'] as $ke => $param) {
                if (empty($param)) {
                    continue;
                }
                // TODO: 还需要校验请求参数合法性, 如只允许的参数： idcard,realname,bankcard,mobile
                $newParam[$ke] = (is_object($param)) ? trim($param->__toString()) : trim($param);
            }
            $this->dataSet['param'] = $newParam;

            $newData = [];
            foreach ($dataSet['data'] as $key => $value) {
                // $tmp = array_combine($dataSet['param'], $value);
                $temp = [];
                foreach ($value as $kk => $vv) {
                    if (empty($vv)) {
                        continue;
                    }
                    $temp[$dataSet['param'][$kk]] = (is_object($vv)) ? trim($vv->__toString()) : trim($vv);
                }
                if ($temp) {
                    $newData[] = $temp;

                    $params = array_merge($temp, ['key' => $appkey]);
                    $uri = $url.'?'.http_build_query($params);
                    yield function() use ($client, $uri) {
                        return $client->getAsync($uri);
                    };
                }
            }
            $this->dataSet['data'] = $newData;
        };

        $pool = new Pool($client, $requests($url, $appkey, $this->dataSet), [
            'concurrency' => $this->concurrent, // 并发设置
            'fulfilled' => function($response, $index) {
                // this is delivered each successful response
                $result = $response->getBody()->getContents();
                // var_dump($result);
                // var_dump($index);
                $this->data[$index] = $result;
            },
            'rejected' => function($reason, $index) {
                // this is delivered each failed request
                return 'Index: '.$index.' Reason:'.$reason;
            },
        ]);

        // Initiate the transfers and create a promise
        $promise = $pool->promise();
        // Force the pool of requests to complete.
        $promise->wait();

        // 处理 data 数据然后返回
        $returnArray = [];
        foreach ($this->data as $k => $v) {
            $returnArray[$k]['param'] = $this->dataSet['data'][$k];
            $returnArray[$k]['result'] = $v;
        }
        return $returnArray;
    }


    /**
     * 存储 Excel 数据
     *
     * @param $param
     * @param $result
     *
     * @return bool|string
     */
    public function saveExcel($param, $result)
    {
        /************************* 2. 写入 Excel 文件 ******************************/
        // 首先创建一个新的对象  PHPExcel object
        $objPHPExcel = new Spreadsheet();

        /** 以下是一些设置 ，什么作者、标题信息 */
        $objPHPExcel->getProperties()->setCreator('lisgroup')
            ->setLastModifiedBy('lisgroup')
            ->setTitle('EXCEL 导出')
            ->setSubject('EXCEL 导出')
            ->setDescription('导出数据')
            ->setKeywords("excel php")
            ->setCategory("result file");
        /*以下就是对处理Excel里的数据， 横着取数据，主要是这一步，其他基本都不要改*/

        // Excel 的第 A 列，uid 是你查出数组的键值，下面以此类推
        try {
            // ErrorException: Undefined offset: 0 in ApiExcelListener.php:76
            $setActive = $objPHPExcel->setActiveSheetIndex(0);
            // 1. 第一行应该是 param 参数
            $keys = array_keys($result[0]['param']);
            $i = 'A';
            foreach ($keys as $num => $key) {
                $setActive->setCellValue($i.'1', "\t".$key);
                $i++;
            }

            // 1.2 处理配置的字段
            if ($param['result'] && $arr = explode(',', $param['result'])) {
                foreach ($arr as $item) {
                    $val = $item ?? '';
                    if (strpos($item, '.') !== false) {
                        $kems = explode('.', $item);
                        $val = end($kems);
                    }
                    $setActive->setCellValue($i.'1', $val ?? '');
                    $i++;
                }
            }
            // 1.3 is_need 字段
            if ($param['is_need'] == 1) {
                $setActive->setCellValue($i.'1', 'res');
            }

            // 2. 第二行开始循环数据
            foreach ($result as $key => $value) {
                // 2.1 第二行位置
                $number = $key + 2;

                $i = 'A';
                foreach ($keys as $num => $key) {
                    $setActive->setCellValue($i.$number, "\t".$value['param'][$key]);
                    $i++;
                }

                // 2.2 处理配置的字段
                $array = json_decode($value['result'], true);

                if ($param['result'] && $arr = explode(',', $param['result'])) {
                    foreach ($arr as $item) {
                        // 2019-02-27 日新增： 354 接口配置 data.0.status 字段
                        // 输出需要 $array['result']['data'][0]['status']
                        $val = $array['result'][$item] ?? '';
                        if (strpos($item, '.') !== false) {
                            $kems = explode('.', $item);
                            $val = $array['result'];
                            foreach ($kems as $kem) {
                                $val = $val[$kem] ?? '';
                            }

                        }

                        $setActive->setCellValue($i.$number, $val);
                        $i++;
                    }
                }

                // 1.3 is_need 字段
                if ($param['is_need'] == 1) {
                    if (isset($array['error_code']) && $array['error_code'] == 0) {
                        if (isset($array['result']['res'])) {
                            $message = $array['result']['res'] == 1 ? '一致' : '不一致';
                        } else {
                            $message = '';
                        }
                    } else {
                        $message = $array['reason'] ?? '';
                    }
                    $setActive->setCellValue($i.$number, $message);
                }
            }

            //得到当前活动的表,注意下文教程中会经常用到$objActSheet
            $objActSheet = $objPHPExcel->getActiveSheet();
            // 位置bbb  *为下文代码位置提供锚
            // 给当前活动的表设置名称
            $objActSheet->setTitle('Simple');
            // 代码还没有结束，可以复制下面的代码来决定我们将要做什么

            // 1,直接生成一个文件
            $objWriter = IOFactory::createWriter($objPHPExcel, 'Xlsx');
            $path = storage_path('app/public');
            // is_dir($path) || mkdir($path, 777, true);
            $fileName = '/out-208-'.date('mdHis').'.xlsx';
            $objWriter->save($path.$fileName);

            return '/storage'.$fileName;
        } catch (\PhpOffice\PhpSpreadsheet\Exception|\PhpOffice\PhpSpreadsheet\Writer\Exception $exception) {
            // 记录任务失败的错误日志
            Log::error('Api_Excel 任务执行失败: ', ['error' => $exception]);
            return false;
        }
    }

    /**
     * BusRepository constructor.
     */
    private function __construct()
    {
        //$this->ql || $this->ql = QueryList::getInstance();
    }

    /**
     * 不允许 clone
     */
    private function __clone()
    {

    }
}
