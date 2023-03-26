#include "sys.h"
#include "my_dcmi.h"  
#include "led.h" 
#include "ov2640.h" 
//////////////////////////////////////////////////////////////////////////////////	 
//������ֻ��ѧϰʹ�ã�δ��������ɣ��������������κ���;
//ALIENTEK STM32F407������
//DCMI ��������	   
//����ԭ��@ALIENTEK
//������̳:www.openedv.com
//��������:2014/5/14
//�汾��V1.0
//��Ȩ���У�����ؾ���
//Copyright(C) ������������ӿƼ����޹�˾ 2014-2024
//All rights reserved									  
////////////////////////////////////////////////////////////////////////////////// 	 

//DCMI_HandleTypeDef  DCMI_Handler;           //DCMI���
//DMA_HandleTypeDef   DMADMCI_Handler;        //DMA���

//u8 ov_frame=0;  							//֡��
//extern void jpeg_data_process(void);		//JPEG���ݴ�����

//////DCMI�жϷ�����
////void DCMI_IRQHandler(void)
////{
////    HAL_DCMI_IRQHandler(&DCMI_Handler);
////}

////����һ֡ͼ������
////hdcmi:DCMI���
//void HAL_DCMI_FrameEventCallback(DCMI_HandleTypeDef *hdcmi)
//{
//	__HAL_DCMI_CLEAR_FLAG(&DCMI_Handler,DCMI_FLAG_FRAMERI);//���֡�ж�
//	jpeg_data_process();//jpeg���ݴ���
//	LED1=!LED1;
//	ov_frame++; 
//    //����ʹ��֡�ж�,��ΪHAL_DCMI_IRQHandler()������ر�֡�ж�
//    __HAL_DCMI_ENABLE_IT(&DCMI_Handler,DCMI_IT_FRAME);
//}

//////DCMI DMA����
//////memaddr:�洢����ַ  ��Ҫ�洢����ͷ���ݵ��ڴ��ַ(Ҳ�����������ַ)
//////memblen:�洢��λ��,����Ϊ:DMA_MDATAALIGN_BYTE/DMA_MDATAALIGN_HALFWORD/DMA_MDATAALIGN_WORD
//////meminc:�洢��������ʽ,����Ϊ:DMA_MINC_ENABLE/DMA_MINC_DISABLE
////void DCMI_DMA_Init(u32 memaddr,u16 memsize,u32 memblen,u32 meminc)
////{ 
////    __HAL_RCC_DMA2_CLK_ENABLE();                                    //ʹ��DMA2ʱ��
////    __HAL_LINKDMA(&DCMI_Handler,DMA_Handle,DMADMCI_Handler);        //��DMA��DCMI��ϵ����
////	
////    DMADMCI_Handler.Instance=DMA2_Stream1;                          //DMA2������1                     
////    DMADMCI_Handler.Init.Channel=DMA_CHANNEL_1;                     //ͨ��1
////    DMADMCI_Handler.Init.Direction=DMA_PERIPH_TO_MEMORY;            //���赽�洢��
////    DMADMCI_Handler.Init.PeriphInc=DMA_PINC_DISABLE;                //���������ģʽ
////    DMADMCI_Handler.Init.MemInc=meminc;                             //�洢������ģʽ
////    DMADMCI_Handler.Init.PeriphDataAlignment=DMA_PDATAALIGN_WORD;   //�������ݳ���:32λ
////    DMADMCI_Handler.Init.MemDataAlignment=memblen;                  //�洢�����ݳ���:8/16/32λ
////    DMADMCI_Handler.Init.Mode=DMA_CIRCULAR;                         //ʹ��ѭ��ģʽ 
////    DMADMCI_Handler.Init.Priority=DMA_PRIORITY_HIGH;                //�����ȼ�
////    DMADMCI_Handler.Init.FIFOMode=DMA_FIFOMODE_ENABLE;              //ʹ��FIFO
////    DMADMCI_Handler.Init.FIFOThreshold=DMA_FIFO_THRESHOLD_HALFFULL; //ʹ��1/2��FIFO 
////    DMADMCI_Handler.Init.MemBurst=DMA_MBURST_SINGLE;                //�洢��ͻ������
////    DMADMCI_Handler.Init.PeriphBurst=DMA_PBURST_SINGLE;             //����ͻ�����δ��� 
////    HAL_DMA_DeInit(&DMADMCI_Handler);                               //�������ǰ������
////    HAL_DMA_Init(&DMADMCI_Handler);	                                //��ʼ��DMA
////    
////    //�ڿ���DMA֮ǰ��ʹ��__HAL_UNLOCK()����һ��DMA,��ΪHAL_DMA_Statrt()HAL_DMAEx_MultiBufferStart()
////    //����������һ��ʼҪ��ʹ��__HAL_LOCK()����DMA,������__HAL_LOCK()���жϵ�ǰ��DMA״̬�Ƿ�Ϊ����״̬�������
////    //����״̬�Ļ���ֱ�ӷ���HAL_BUSY�������ᵼ�º���HAL_DMA_Statrt()��HAL_DMAEx_MultiBufferStart()������DMA����
////    //����ֱ�ӱ�������DMAҲ�Ͳ�������������Ϊ�˱���������������������DMA֮ǰ�ȵ���__HAL_UNLOC()�Ƚ���һ��DMA��
////    __HAL_UNLOCK(&DMADMCI_Handler);

////	HAL_DMA_Start(&DMADMCI_Handler,(u32)&DCMI->DR,memaddr,memsize);
////}

//////DCMI��ʼ��
////void DCMI_Init(void)
////{
////    DCMI_Handler.Instance=DCMI;
////    DCMI_Handler.Init.SynchroMode=DCMI_SYNCHRO_HARDWARE;    //Ӳ��ͬ��HSYNC,VSYNC
////    DCMI_Handler.Init.PCKPolarity=DCMI_PCKPOLARITY_RISING;  //PCLK ��������Ч
////    DCMI_Handler.Init.VSPolarity=DCMI_VSPOLARITY_LOW;       //VSYNC �͵�ƽ��Ч
////    DCMI_Handler.Init.HSPolarity=DCMI_HSPOLARITY_LOW;       //HSYNC �͵�ƽ��Ч
////    DCMI_Handler.Init.CaptureRate=DCMI_CR_ALL_FRAME;        //ȫ֡����
////    DCMI_Handler.Init.ExtendedDataMode=DCMI_EXTEND_DATA_8B; //8λ���ݸ�ʽ 
////    HAL_DCMI_Init(&DCMI_Handler);                           //��ʼ��DCMI

////	//�ر������жϣ�����HAL_DCMI_Init()��Ĭ�ϴ򿪺ܶ��жϣ�������Щ�ж�
////	//�Ժ����Ǿ���Ҫ����Щ�ж�����Ӧ�Ĵ�������Ļ��ͻᵼ�¸��ָ��������⣬
////	//������Щ�жϺܶ඼����Ҫ���������ｫ��ȫ���رյ���Ҳ���ǽ�IER�Ĵ������㡣
////	//�ر��������ж��Ժ��ٸ����Լ���ʵ��������ʹ����Ӧ���жϡ�
////	DCMI->IER=0x0;										
////	
////	__HAL_DCMI_ENABLE_IT(&DCMI_Handler,DCMI_IT_FRAME);		//����֡�ж�
////	__HAL_DCMI_ENABLE(&DCMI_Handler);						//ʹ��DCMI
////	
////}

//////DCMI�ײ��������������ã�ʱ��ʹ�ܣ��ж�����
//////�˺����ᱻHAL_DCMI_Init()����
//////hdcmi:DCMI���
////void HAL_DCMI_MspInit(DCMI_HandleTypeDef* hdcmi)
////{
////	 GPIO_InitTypeDef GPIO_Initure;
////    __HAL_RCC_DCMI_CLK_ENABLE();                //ʹ��DCMIʱ��

////    __HAL_RCC_GPIOA_CLK_ENABLE();               //ʹ��GPIOAʱ��
////    __HAL_RCC_GPIOB_CLK_ENABLE();               //ʹ��GPIOBʱ��
////    __HAL_RCC_GPIOC_CLK_ENABLE();               //ʹ��GPIOCʱ��
////    __HAL_RCC_GPIOE_CLK_ENABLE();               //ʹ��GPIOEʱ��
////    
////    //PA4/6��ʼ������
////    GPIO_Initure.Pin=GPIO_PIN_4|GPIO_PIN_6;  
////    GPIO_Initure.Mode=GPIO_MODE_AF_PP;          //���츴��
////    GPIO_Initure.Pull=GPIO_PULLUP;              //����
////    GPIO_Initure.Speed=GPIO_SPEED_HIGH;         //����
////    GPIO_Initure.Alternate=GPIO_AF13_DCMI;      //����ΪDCMI   
////    HAL_GPIO_Init(GPIOA,&GPIO_Initure);         //��ʼ��
////    
////    //PB6,7
////    GPIO_Initure.Pin=GPIO_PIN_6|GPIO_PIN_7;  
////    HAL_GPIO_Init(GPIOB,&GPIO_Initure);         //��ʼ��
////    
////    //PC6,7,8,9,11
////    GPIO_Initure.Pin=GPIO_PIN_6|GPIO_PIN_7|GPIO_PIN_8|\
////                     GPIO_PIN_9|GPIO_PIN_11;  
////    HAL_GPIO_Init(GPIOC,&GPIO_Initure);         //��ʼ��
////    
////	//PE5,6 
////    GPIO_Initure.Pin=GPIO_PIN_5|GPIO_PIN_6; 
////    HAL_GPIO_Init(GPIOE,&GPIO_Initure);         //��ʼ��
////    
////    HAL_NVIC_SetPriority(DCMI_IRQn,0,0);        //��ռ���ȼ�0�������ȼ�0
////    HAL_NVIC_EnableIRQ(DCMI_IRQn);              //ʹ��DCMI�ж�
////}

////DCMI,��������
//void DCMI_Start(void)
//{  
//	__HAL_DMA_ENABLE(&DMADMCI_Handler); 	//ʹ��DMA
//	DCMI->CR|=DCMI_CR_CAPTURE;    			//DCMI����ʹ�� 
//}

////DCMI,�رմ���
//void DCMI_Stop(void)
//{
//	DCMI->CR&=~(DCMI_CR_CAPTURE);  			//�رղ���  
//	while(DCMI->CR&0X01);					//�ȴ�������� 
//	__HAL_DMA_DISABLE(&DMADMCI_Handler);	//�ر�DMA 	
//} 









