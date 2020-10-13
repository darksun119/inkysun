package com.inkysun.ThreadSafe;

import java.util.ArrayList;

public class Async {
    public ArrayList<Customer> list = new ArrayList<>();

    public static void main(String[] args) {
        Async test = new Async();
        for (int i = 1; i <10 ; i++) {
            test.addCustomer(i,i);
        }
        test.addCooker(1);
        test.addCooker(2);
    }


    public void addCustomer(int id,int num){
        Customer customer = new Customer(id,num);
        customer.thread = new Thread(customer);
        customer.thread.start();
        list.add(customer);
    }
    public void addCooker(int id){
        Cooker cooker = new Cooker(id);
        new Thread(cooker).start();
    }

    class Customer implements Runnable{
        public int id;
        public int num;
        public Thread thread;
        public Customer(int id,int goodsNum) {
            this.id = id;
            this.num = goodsNum;
        }
        @Override
        public void run() {
            System.out.println("我是顾客"+this.id+",我要买"+this.num+"个包子");
            synchronized (this){
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    class Cooker implements Runnable{
        public int id;
        public Customer currentCustomer=null;
        public boolean running = true;
        public Cooker(int id) {
            this.id = id;
        }

        @Override
        public void run() {
            while (running){
                if(this.currentCustomer==null){
                    if(list.size()>0){
                        this.currentCustomer = list.get(0);
                        list.remove(0);
                    }else{
                        this.running = false;
                    }
                }
                if(this.currentCustomer!=null){
                    try {
                        Thread.sleep(this.currentCustomer.num*100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    synchronized (this.currentCustomer){
                        this.currentCustomer.notify();
                        System.out.println("厨师 id"+this.id+"通知了顾客"+this.currentCustomer.id);
                        this.currentCustomer=null;
                    }
                }
            }
        }
    }
}

